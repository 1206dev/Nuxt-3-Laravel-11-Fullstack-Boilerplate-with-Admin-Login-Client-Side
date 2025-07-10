import { defu } from 'defu'
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import type { UseFetchOptions } from '#app'
import { createError, useFetch, useRuntimeConfig } from '#imports'
import { getKeyApi } from '~/utils'
import { currentLangState } from '~/store'
import { ONE_WEEK } from '~/constants'

interface ErrorType {
  errors: Record<string, string[]>
}

export type FetchOptions<T> = UseFetchOptions<T> & { timeout?: number }

export function useAPI<T = unknown>(
  url: string | (() => string),
  userOptions: FetchOptions<T> = {},
) {
  const expireDate = new Date(Date.now() + (52 * ONE_WEEK))
  const config = useRuntimeConfig()
  const userToken = useToken({ expires: expireDate })

  /**
   * Aborting a fetch with timeout
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#aborting_a_fetch_with_timeout_or_explicit_abort|Aborting a fetch}
   */
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort(
      createError({
        statusCode: 408,
        statusMessage: 'aborted',
        message: 'This request has been automatically aborted.',
      }),
    )
  }, userOptions.timeout)

  const defaultOptions: FetchOptions<T> = {
    baseURL: `${config.public.apiUrl}`,
    method: 'GET',
    retry: 3,
    signal: userOptions.timeout ? controller.signal : undefined,

    // cache request
    cache: false,
    key: getKeyApi(url, userOptions),

    onRequest({ options }) {
      if (options?.body?.page?.page) {
        options.body.page.page = options.body.page.page - 1
      }

      options.headers = {
        ...options.headers,
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=utf-8',
      }

      const hasToken = userToken.hasToken()

      if (hasToken) {
        const getToken = userToken.get()
        options.headers = {
          ...options.headers,
          Authorization: getToken,
        }
      }

      const currentLang = currentLangState()
      options.headers = {
        ...options.headers,
        clientLocale: currentLang.get.value === 'en' ? 'en_US' : 'vi_VN',
      }

      if (userOptions.headers) {
        options.headers = {
          ...options.headers,
          ...userOptions.headers,
        }
      }
    },

    onResponse({ response }) {
      const hasError = !response.status.toString().startsWith('2') || response._data.status === 'error'

      if (hasError) {
        throw createError({
          statusCode: response.status,
          error_detail: response._data,
        })
      }

      const token = response._data?.access_token

      if (token) {
        userToken.set(token)
      }
    },

    onResponseError({ response }) {
      const statusCode = response.status || 500
      const statusMessage = response.statusText || ''
      const errorsMsg = (response._data || {}) as ErrorType

      const errorEntries = Object.entries(errorsMsg.errors)

      const message = errorEntries.reduce((acc: string[], [key, value]) => {
        return [...acc, ...value.map(item => `${key} ${item}`)]
      }, [])

      throw createError({ statusCode, statusMessage, message: message.join('_::_') })
      // console.log('====response error', response)
    },
  }

  const options = defu(userOptions, defaultOptions) as UseFetchOptions<T>

  return useFetch(`${url}`, options).finally(() => {
    if (userOptions.timeout && timeoutId) {
      clearTimeout(timeoutId)
    }
  })
}
