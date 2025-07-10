import { defineNuxtRouteMiddleware } from '#app'
import { authState, currentLangState } from '~/store'

const getLocalePathFromUrl = (path, lang) => {
  return lang && lang !== 'vn' ? ('/' + lang + path) : path
}

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  const auth = authState()
  const currentLang = currentLangState()
  const currentLangCode = currentLang.get

  if (to.fullPath.includes('/auth/login')) {
    return
  }

  if (!to.fullPath.includes('/admin')) {
    return
  }

  if (!auth.get.value) {
    return navigateTo(getLocalePathFromUrl('/auth/login', currentLangCode.value), { redirectCode: 401 })
  }

  const expireDate = auth.getExpireDate?.value

  if (expireDate) {
    const now = new Date()
    const expireDateObj = new Date(expireDate)
    if (expireDateObj < now) {
      console.log('date expire:' + expireDateObj)
      console.log('date now:' + now)
      console.log('expireDate')
      auth.logout()
      return navigateTo(getLocalePathFromUrl('/auth/login', currentLangCode.value), { redirectCode: 401 })
    }
  }

  if (auth.get.value?.data) {
    // no-op
  }
})
