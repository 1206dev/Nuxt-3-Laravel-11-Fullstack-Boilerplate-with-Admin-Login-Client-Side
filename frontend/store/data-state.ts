import { computed, useState } from '#imports'

export const dataState = (stateKey) => {
  if (!import.meta.client) return
  const state = useState<unknown>(stateKey, () => ({}))

  const get = () => {
    return computed(() => state.value ? state.value : {})
  }

  const set = (newValue) => {
    state.value = newValue
  }

  const clear = () => {
    state.value = {}
  }

  return { get, set, clear }
}
