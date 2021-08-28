import { reactive, watch } from 'vue'

export default function usePaginate(wrapper) {
  // navigation
  const navigate = (page) => {
    const pagination = { ...wrapper.pagination }
    wrapper.emit('pagination:before-navigate', page, pagination.currentPage)
    wrapper.pagination.currentPage = page
    wrapper.emit('pagination:navigated', page, pagination.currentPage)
  }

  //
  wrapper.pagination = reactive({
    currentPage: 1,
    perPage: wrapper.options.perPage,
    showEntriesBy: wrapper.options.showEntriesBy,
    filterMode: false,
    totalRow: 0,
    totalFilteredRow: 0,
    totalPage: 1,
    firstItemIndex: 0,
    lastItemIndex: 0,
    navigate,
  })

  // watch
  watch(wrapper.pagination, (val) => wrapper.emit('pagination:change', val))

  // add to global ref
  wrapper.globalReferences.pagination = wrapper.pagination
}
