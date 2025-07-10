import {
  format,
  sub,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns'
import nlp from 'compromise'
import type { FetchOptions } from '~/composables/useAPI'
import {
  authState,
} from '~/store'

export const getDates = Array.from({ length: 31 }, (_, i) => i + 1)
export const getMonths = Array.from({ length: 12 }, (_, i) => i + 1)
const year = new Date().getFullYear()
export const getYears = Array.from({ length: year - 1900 + 1 }, (_, i) => year - i)
export const formatNumber = (number?: number, decimal: number = 2) => {
  if (typeof number !== 'number' || !number) return ''
  const roundedNumber = number.toFixed(decimal)
  return Number.parseFloat(roundedNumber).toLocaleString('en-US')
}
export const formatDateToString = (date: Date | string, formatOutput: string = 'dd/MM/yyyy') => {
  return format(new Date(date), formatOutput)
}
export function getKeyApi<T = unknown>(
  url: string | (() => string),
  userOptions: FetchOptions<T> = {},
) {
  const body = userOptions.body ? JSON.stringify(userOptions.body) : ''
  const key = typeof url === 'string'
    ? `${url}-${userOptions?.method}-${body}`
    : `${url()}-${userOptions?.method}-${body}`
  return key
}

export const convertObjectRecordToOptionSelect2 = (obj: Record<string, string>): { id: string, text: string }[] => {
  return Object.entries(obj).map(([id, text]) => ({ id, text }))
}

export const generateUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const randomStr = Math.random() * 16 | 0
    const randomStrId = c === 'x' ? randomStr : (randomStr & 0x3 | 0x8)
    return randomStrId.toString(16).toUpperCase()
  })
}

export const currentUser = () => {
  const { get } = authState()
  return get.value && get.value.data ? get.value.data : {}
}

export const isObjectNotEmpty = (obj) => {
  return JSON.stringify(obj) !== '{}'
}

export const compare2Object = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const getDateRange = (numberDays, formatDate = 'yyyy-MM-dd') => {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - numberDays + 1)
  const start = format(startDate, formatDate)

  const endDate = new Date()
  const end = format(endDate, formatDate)

  return { start, end }
}

export const removeVietnameseTones = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

export const getLocalePath = (path, lang) => {
  return lang && lang !== 'vn' ? ('/' + lang + path) : path
}

export const isNumString = (str) => {
  return !Number.isNaN(Number(str))
}

export const deepParseJson = (jsonString) => {
  if (typeof jsonString === 'string') {
    if (isNumString(jsonString)) {
      return jsonString
    }
    try {
      return deepParseJson(JSON.parse(jsonString))
    }
    catch {
      return jsonString
    }
  }

  if (Array.isArray(jsonString)) {
    return jsonString.map(val => deepParseJson(val))
  }

  if (typeof jsonString === 'object' && jsonString !== null) {
    return Object.keys(jsonString).reduce((obj, key) => {
      obj[key] = deepParseJson(jsonString[key])
      return obj
    }, {})
  }

  return jsonString
}

export const resizeImageToMaxSize = (file: File, targetSizeKB = 50): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (file.size <= targetSizeKB * 1024) {
      resolve(file)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const width = img.width
        const height = img.height
        const originalSizeKB = file.size / 1024
        const compressionRatio = targetSizeKB / originalSizeKB

        let quality = Math.max(0.3, compressionRatio)
        let scaleFactor = compressionRatio < 0.7 ? Math.sqrt(compressionRatio) : 1

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Canvas context is not available'))
          return
        }

        const tryCompress = () => {
          canvas.width = Math.floor(width * scaleFactor)
          canvas.height = Math.floor(height * scaleFactor)
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Compression failed'))
                return
              }

              const sizeKB = blob.size / 1024

              if (sizeKB <= targetSizeKB) {
                resolve(new File([blob], file.name, { type: file.type }))
              }
              else if (quality > 0.3) {
                quality -= 0.05
                tryCompress()
              }
              else if (scaleFactor > 0.2) {
                scaleFactor -= 0.1
                quality = Math.max(0.3, quality + 0.1)
                tryCompress()
              }
              else {
                reject(new Error('Unable to compress image to the target size'))
              }
            },
            file.type,
            quality,
          )
        }

        tryCompress()
      }
      img.onerror = reject
      img.src = event.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const formatRelativeTime = (datetime, t) => {
  if (!datetime) {
    return ''
  }
  const date = new Date(datetime)
  const now = new Date()

  const diffDays = differenceInDays(now, date)
  const diffHours = differenceInHours(now, date)
  const diffMinutes = differenceInMinutes(now, date)
  const diffSeconds = differenceInSeconds(now, date)

  if (diffDays > 6) {
    return format(date, 'yyyy-MM-dd hh:mm a')
  }
  else if (diffDays > 0) {
    return `${diffDays} ${t('days ago')}`
  }
  else if (diffHours > 0) {
    return `${diffHours} ${t('hours ago')}`
  }
  else if (diffMinutes > 0) {
    return `${diffMinutes} ${t('minutes ago')}`
  }
  else {
    return `${diffSeconds} ${t('seconds ago')}`
  }
}

export const formatDuration = (seconds, t) => {
  if (!seconds) {
    return ''
  }
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} ${t('minutes')}`
  return `${Math.round(minutes / 60)} ${t('hours')}`
}

export const formatDurationRead = (seconds, t) => {
  if (!seconds) {
    return ''
  }
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} ${t('minutes read')}`
  return `${Math.round(minutes / 60)} ${t('hours read')}`
}

export const stripHtml = (html) => {
  return html ? html.replace(/<[^>]*>/g, '').trim() : ''
}
