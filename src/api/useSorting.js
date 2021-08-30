import { reactive, ref, computed, watch } from 'vue'

export default function useSorting(wrapper) {
  //
  const sortMode = ref('single')
  const order = reactive([])
  const sortableColumns = computed(() =>
    wrapper.columns.value.filter((column) => column.sortable !== false)
  )

  // functions
  const getSortType = (column) => {
    const check = order.find((item) => item.name === column.name)
    if (check) {
      return check.direction
    }
    return false
  }

  // listeners
  wrapper.addListener('table:thead:column:click', (column) => {
    const checkIfSortableColumn = sortableColumns.value.find(
      (item) => item.name === column.name
    )
    if (!checkIfSortableColumn) return

    const checkInOrder = order.find((item) => item.name === column.name)
    if (checkInOrder) {
      checkInOrder.direction =
        checkInOrder.direction === 'desc' ? 'asc' : 'desc'
    } else {
      if (sortMode.value === 'single') {
        order.splice(0, order.length)
      }
      order.push({ name: column.name, direction: 'desc' })
    }
  })

  // inject wrapper
  wrapper.sortMode = sortMode
  wrapper.order = order
  wrapper.sortableColumns = sortableColumns
  wrapper.globalReferences.order = wrapper.order
  wrapper.globalReferences.getSortType = getSortType
}
