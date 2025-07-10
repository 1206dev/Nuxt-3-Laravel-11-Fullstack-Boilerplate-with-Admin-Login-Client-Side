import { computed, useState, watchEffect } from '#imports'
import type { SimpleFlatten } from '~/types'

export const currentLangState = () => {
  if (!import.meta.client) return
  const state = useState<SimpleFlatten<unknown> | undefined>('currentLang', () => {
    const storedState = localStorage.getItem('currentLang')
    return storedState ? JSON.parse(storedState) : undefined
  })

  const get = computed(() => state.value)

  const set = (newValue?: unknown) => {
    state.value = newValue

    if (newValue) {
      localStorage.setItem('currentLang', JSON.stringify(newValue))
    }
    else {
      localStorage.removeItem('currentLang')
    }
  }

  watchEffect(() => {
    if (state.value) {
      localStorage.setItem('currentLang', JSON.stringify(state.value))
    }
    else {
      localStorage.removeItem('currentLang')
    }
  })

  return { get, set }
}
