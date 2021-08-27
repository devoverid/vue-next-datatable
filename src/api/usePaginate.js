import { reactive, watch } from 'vue'

export default function usePaginate(wrapper) {
  // navigation
  const navigate = (page) => {
    wrapper.emit('pagination:change', page)
    wrapper.pagination.currentPage = page
  }

  //
  wrapper.pagination = reactive({
    currentPage: 1,
    perPage: wrapper.options.perPage,
    showEntriesBy: wrapper.options.showEntriesBy,
    totalRow: 0,
    totalPage: 1,
    navigate,
  })

  // watch
  watch(wrapper.pagination, (oldValue, newValue) =>
    wrapper.emit('pagination:change', { oldValue, newValue })
  )

  // add to global ref
  wrapper.globalReferences.pagination = wrapper.pagination
}
