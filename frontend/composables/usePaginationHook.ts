import { PAGE_SIZE_LIMIT } from '~/constants'

export const usePaginationHook = (limit: number = PAGE_SIZE_LIMIT) => {
  const pageIndex = ref(1)
  const size = ref(limit)
  const onPageChangeHandler = (page: number) => {
    pageIndex.value = page
  }
  return {
    pageIndex,
    onPageChange: onPageChangeHandler,
    size: size,
  }
}
