import { ref, computed, watch, getCurrentInstance } from 'vue'

export default function useModeClient(wrapper) {
  const data = computed(() => wrapper.props.data)
  const rows = computed(() => {
    // filter by search
    const filteredDataBySearch = data.value.filter((row) => {
      let result = false
      for (let i = 0; i < wrapper.searchableColumns.value.length; i++) {
        const column = wrapper.searchableColumns.value[i]
        const columnValue = `${row[column.name]}`.toLowerCase()
        const included = columnValue.includes(`${wrapper.search.value}`)
        if (included) {
          result = true
          break
        }
      }
      return result
    })
    // filter paginate
    const countRows = filteredDataBySearch.length
    const currentPage = wrapper.pagination.currentPage
    const perPage = wrapper.pagination.perPage
    const totalPage = Math.ceil(filteredDataBySearch.length / perPage)
    const filteredDataByPagination = filteredDataBySearch.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    )
    wrapper.pagination.totalPage = totalPage

    //
    return filteredDataByPagination
  })

  return {
    rows,
  }
}
