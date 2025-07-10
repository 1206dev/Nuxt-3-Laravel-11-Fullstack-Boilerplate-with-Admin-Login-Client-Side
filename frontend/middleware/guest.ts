import { defineNuxtRouteMiddleware } from '#app'
import { authState } from '~/store'

export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) return
  const userAuth = authState()

  if (userAuth.get.value) {
    return `/`
  }
})
