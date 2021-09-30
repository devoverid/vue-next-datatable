import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue'
import Axios from 'axios'
import { debounce } from '../utils/debounce'

function createHttpInstance(wrapper) {
  return Axios.create({
    baseURL: wrapper.options.server.url,
    timeout: 5000,
  })
}

export default function useModeServer(wrapper) {
  //
  const http = createHttpInstance(wrapper)

  //
  const data = ref([])
  const rows = computed(() => data.value)

  // methods
  const fetchData = () => {
    //
    wrapper.loading(true)
    wrapper.emit('table:server:fetch')

    //
    const { currentPage, perPage } = wrapper.pagination
    const meta = {
      order: wrapper.order,
      filters: wrapper.filters,
      columns: wrapper.props.columns,
      pagination: {
        currentPage,
        perPage,
      },
    }
    const fetchOptions = {
      method: 'GET',
      data: {},
      params: {},
      headers: {},
    }
    if (fetchOptions.method === 'GET') {
      fetchOptions.params = { ...meta }
    } else {
      fetchOptions.data = { ...meta }
    }

    //
    http(fetchOptions)
      .then((response) => {
        wrapper.emit('table:server:fetch-complete', response)
        if (response.data.data) {
          data.value = response.data.data
          wrapper.pagination.currentPage =
            response.data.meta.pagination.currentPage
          wrapper.pagination.totalPage = response.data.meta.pagination.totalPage
          wrapper.pagination.totalRow = response.data.recordsTotal
          wrapper.pagination.totalFilteredRow = response.data.recordsFiltered
          wrapper.pagination.firstItemIndex =
            response.data.meta.pagination.firstItemIndex
          wrapper.pagination.lastItemIndex =
            response.data.meta.pagination.lastItemIndex
          wrapper.pagination.filterMode = true
          if (
            wrapper.pagination.totalPage > 0 &&
            wrapper.pagination.currentPage > wrapper.pagination.totalPage
          ) {
            wrapper.pagination.currentPage = wrapper.pagination.totalPage
          }
        }
      })
      .catch((error) => {
        wrapper.emit('table:server:fetch-error', error)
      })
      .finally(() => {
        wrapper.emit('table:server:fetch-finally')
        wrapper.loading(false)
      })
  }
  const refreshData = debounce(fetchData, 300)

  // watch and listener
  watch(data, (val) => wrapper.emit('table:server:data-changed', val))
  watch(rows, (val) => wrapper.emit('table:server:rows-changed', val))
  watch(wrapper.filters, refreshData)
  wrapper.addListener('pagination:navigated', refreshData)
  wrapper.addListener('table:sort:order:change', refreshData)

  // lifecycle
  onMounted(() => {
    fetchData()
  })

  return {
    data,
    rows,
  }
}
