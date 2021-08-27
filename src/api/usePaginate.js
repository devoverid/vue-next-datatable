import { reactive, watch } from 'vue'

export default function usePaginate(wrapper) {
  wrapper.pagination = reactive({
    currentPage: 1,
    perPage: wrapper.options.perPage,
    showEntriesBy: wrapper.options.showEntriesBy,
    total: 0,
    totalPage: 0,
  })
  watch(wrapper.pagination, (oldValue, newValue) =>
    wrapper.emit('pagination:change', { oldValue, newValue })
  )
  wrapper.globalReferences.pagination = wrapper.pagination
}
