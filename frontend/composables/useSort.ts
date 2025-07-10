export const useSort = () => {
  const sort = ref('')
  const direction = ref('')
  const handleSort = (field: string) => {
    if (!sort.value || sort.value !== field) {
      sort.value = field
      direction.value = 'ASC'
    }
    else {
      direction.value = direction.value === 'ASC' ? 'DESC' : 'ASC'
    }
  }
  return {
    sort,
    direction,
    handleSort,
  }
}
