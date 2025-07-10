import type { UseFetchOptions } from 'nuxt/app'

export function useApiDataServer<T>(
  key: string,
  url: string,
  options: {
    params?: Record<string, any>
    method?: UseFetchOptions<T>['method']
    body?: any
    headers?: Record<string, string>
  } = {},
) {
  const config = useRuntimeConfig()

  return useAsyncData<T>(key, () =>
    $fetch(`${config.public.apiUrl}${url}`, {
      method: options.method || 'GET',
      params: options.params,
      body: options.body,
      headers: options.headers,
    }),
  )
}
