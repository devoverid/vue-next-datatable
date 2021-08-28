import { ref, computed, watch, getCurrentInstance } from 'vue'

export default function useModeClient(wrapper) {
  const rows = computed(() => {
    // hook
    const rows = wrapper.applyHook('table:client:rows', wrapper.data)
    // const rows = data.value

    // filter by search
    const filteredDataBySearch = rows.filter((row) => {
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
    const perPage = wrapper.pagination.perPage
    const totalPage = Math.ceil(filteredDataBySearch.length / perPage)
    let currentPage = 1
    if (wrapper.pagination.currentPage > totalPage && totalPage !== 0) {
      currentPage = totalPage
      wrapper.pagination.currentPage = totalPage
    } else {
      currentPage = wrapper.pagination.currentPage
    }
    const filteredDataByPagination = filteredDataBySearch.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    )
    wrapper.pagination.totalPage = totalPage
    wrapper.pagination.totalRow = countRows
    wrapper.pagination.firstItemIndex = (currentPage - 1) * perPage + 1
    wrapper.pagination.lastItemIndex =
      currentPage * perPage > countRows ? countRows : currentPage * perPage

    //
    return filteredDataByPagination
  })

  return {
    rows,
  }
}
