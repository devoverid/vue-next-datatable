import { ref, computed, watch, getCurrentInstance } from 'vue'
import merge from 'lodash.merge'

export default function useModeClient(wrapper) {
  const rows = computed(() => {
    wrapper.loading(true)

    const data = wrapper.data

    // Execute search
    // if (!wrapper.index.value) return data
    let searchResult = wrapper.index.value.search(wrapper.filters.search, {
      enrich: true,
    })
    let resultIndexes = []

    // Merge result index each column
    searchResult.forEach((res) => merge(resultIndexes, res.result))

    let filteredDataBySearch

    // if empty, return the original data
    if (wrapper.filters.search == '') filteredDataBySearch = data
    else
      filteredDataBySearch = data.filter((row, index) =>
        resultIndexes.includes(index)
      )

    wrapper.pagination.filterMode = filteredDataBySearch.length != data.length

    // filter by sort
    const filteredDataBySort = filteredDataBySearch.sort((a, b) => {
      let result = 0
      for (let i = 0; i < wrapper.order.length; i++) {
        const order = wrapper.order[i]
        const column = wrapper.sortableColumns.value.find(
          (c) => c.name == order.name
        )

        //
        const columnName = column.name
        if (a[columnName] && b[columnName]) {
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
    wrapper.pagination.totalRow = data.length
    wrapper.pagination.totalFilteredRow = countRows
    wrapper.pagination.firstItemIndex = (currentPage - 1) * perPage + 1
    wrapper.pagination.lastItemIndex =
      currentPage * perPage > countRows ? countRows : currentPage * perPage

    //
    wrapper.loading(false)

    //
    return filteredDataByPagination
  })

  // return
  return {
    rows,
  }
}
