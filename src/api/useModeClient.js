import { ref, computed, watch, getCurrentInstance } from 'vue'

export default function useModeClient(wrapper) {
  const rows = computed(() => {
    //
    wrapper.isLoading.value = true

    //
    const rows = wrapper.data.value

    // filter by search
    const filteredDataBySearch = rows.filter((row) => {
      let result = false
      for (let i = 0; i < wrapper.searchableColumns.value.length; i++) {
        const column = wrapper.searchableColumns.value[i]
        const columnName = `${column.name}`.toLowerCase()
        const columnValue = `${row[columnName]}`.toLowerCase()
        const included = columnValue.includes(`${wrapper.filters.search}`)
        if (included) {
          result = true
          break
        }
      }
      return result
    })
    wrapper.pagination.filterMode = filteredDataBySearch.length != rows.length

    // filter by sort
    const orders = wrapper.order
    const filteredDataBySort = filteredDataBySearch.sort((a, b) => {
      let result = 0
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i]
        const column = wrapper.sortableColumns.value.find(
          (c) => c.name == order.name
        )
        //
        const columnName = column.name
        let aValue = a[columnName]
        let bValue = b[columnName]

        if (typeof aValue == 'string') {
          aValue = `${a[columnName]}`.toLowerCase()
          bValue = `${b[columnName]}`.toLowerCase()
        } else if (typeof aValue == 'number') {
          aValue = parseInt(a[columnName])
          bValue = parseInt(b[columnName])
        }

        //
        if (aValue > bValue) {
          result = order.direction === 'desc' ? -1 : 1
        } else if (aValue < bValue) {
          result = order.direction === 'desc' ? 1 : -1
        }
      }
      return result
    })

    // filter paginate
    const countRows = filteredDataBySort.length
    const perPage = wrapper.pagination.perPage
    const totalPage = Math.ceil(filteredDataBySort.length / perPage)
    let currentPage = 1
    if (wrapper.pagination.currentPage > totalPage && totalPage !== 0) {
      currentPage = totalPage
      wrapper.pagination.currentPage = totalPage
    } else {
      currentPage = wrapper.pagination.currentPage
    }
    const filteredDataByPagination = filteredDataBySort.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    )
    wrapper.pagination.totalPage = totalPage
    wrapper.pagination.totalRow = rows.length
    wrapper.pagination.totalFilteredRow = countRows
    wrapper.pagination.firstItemIndex = (currentPage - 1) * perPage + 1
    wrapper.pagination.lastItemIndex =
      currentPage * perPage > countRows ? countRows : currentPage * perPage

    //
    wrapper.isLoading.value = false

    //
    return filteredDataByPagination
  })

  return {
    rows,
  }
}
