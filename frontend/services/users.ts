import { useAPI } from '~/composables/useAPI'

export const example = () => {
  return useAPI<unknown>(`/api/v0.1/users/current-user`)
}

export const getCurrentUser = () => {
  return {
    username: 'admin',
  }
}
