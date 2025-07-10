import { computed, useState, watchEffect } from '#imports'
import type { SimpleFlatten, User } from '~/types'

export const authState = () => {
  if (!import.meta.client) return
  const state = useState<SimpleFlatten<User> | undefined>('userData', () => {
    const storedState = localStorage.getItem('userData')
    return storedState ? JSON.parse(storedState) : undefined
  })

  const expireDateRef = ref<string | null>(localStorage.getItem('expireDate'))

  const get = computed(() => state.value)

  const getData = () => {
    return computed(() => state.value && state.value.data ? state.value.data : {})
  }

  const set = (newValue?: User, expireDate?: string) => {
    state.value = newValue

    if (newValue) {
      if (expireDate) {
        localStorage.setItem('expireDate', expireDate)
        expireDateRef.value = expireDate
      }
      localStorage.setItem('userData', JSON.stringify(newValue))
    }
    else {
      localStorage.removeItem('userData')
      localStorage.removeItem('expireDate')
      expireDateRef.value = null
    }
  }

  const getExpireDate = computed(() => expireDateRef.value)

  const setExpireDate = (expireDate: string | null) => {
    if (expireDate) {
      localStorage.setItem('expireDate', expireDate)
      expireDateRef.value = expireDate
    }
    else {
      localStorage.removeItem('expireDate')
      expireDateRef.value = null
    }
  }

  const logout = () => {
    state.value = undefined
    localStorage.removeItem('userData')
    localStorage.removeItem('expireDate')
    expireDateRef.value = null
  }

  const syncStateAcrossTabs = (event: StorageEvent) => {
    if (event.key === 'userData') {
      state.value = event.newValue ? JSON.parse(event.newValue) : undefined
    }
    if (event.key === 'expireDate' && event.newValue) {
      expireDateRef.value = event.newValue ? event.newValue : null
    }
  }

  onMounted(() => {
    window.addEventListener('storage', syncStateAcrossTabs)
  })

  onUnmounted(() => {
    window.removeEventListener('storage', syncStateAcrossTabs)
  })

  return { get, getData, set, getExpireDate, setExpireDate, logout }
}
