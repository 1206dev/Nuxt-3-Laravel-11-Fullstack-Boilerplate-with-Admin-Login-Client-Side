import { useAPI } from '~/composables/useAPI'

export const getListSamples = (queries) => {
  return useAPI<unknown>(`/api/samples`, { query: queries })
}

export const getSample = (sampleId) => {
  return useAPI<unknown>(`/api/samples/${sampleId}`)
}

export const createSample = (dataSample) => {
  return useAPI<unknown>(`/api/samples`, {
    method: 'POST',
    body: dataSample,
  })
}

export const updateSample = (sampleId, dataSample) => {
  return useAPI<unknown>(`/api/samples/${sampleId}`, {
    method: 'PUT',
    body: dataSample,
  })
}

export const deleteSample = (sampleId) => {
  return useAPI<unknown>(`/api/samples/${sampleId}`, {
    method: 'DELETE',
  })
}
