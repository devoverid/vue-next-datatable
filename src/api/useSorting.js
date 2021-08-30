import { reactive, ref, computed, watch } from 'vue'

export default function useSorting(wrapper) {
  //
  const sortMode = computed(
    () => wrapper.nextDatatableOptions.defaults.sort.mode
  )
  const order = reactive([])
  const sortableColumns = computed(() =>
    wrapper.columns.value.filter((column) => column.sortable !== false)
  )

  //
  watch(wrapper.props, (newValue) => {
    const orderFromProps = wrapper.nextDatatableOptions.defaults.sort.order
    if (Array.isArray(orderFromProps)) {
      for (let i = 0; i < orderFromProps.length; i++) {
        const element = orderFromProps[i]
        const exist = order.find((item) => item.column === element.column)
        if (!exist) {
          order.push(element)
        } else {
          exist.direction = element.direction
        }
      }
    }
  })
  watch(order, (value) => wrapper.emit('table:sort:order:change', value))

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
      if (checkInOrder.direction === 'desc') {
        checkInOrder.direction = 'asc'
      } else if (checkInOrder.direction === 'asc') {
        order.splice(order.indexOf(checkInOrder), 1)
      } else {
        checkInOrder.direction = 'desc'
      }
    } else {
      const allowedMode = ['single', 'multiple']
      if (allowedMode.includes(sortMode.value)) {
        if (sortMode.value === 'single') {
          order.splice(0, order.length)
        }
        order.push({ name: column.name, direction: 'desc' })
      }
    }
  })

  // inject wrapper
  wrapper.sortMode = sortMode
  wrapper.order = order
  wrapper.sortableColumns = sortableColumns
  wrapper.globalReferences.order = wrapper.order
  wrapper.globalReferences.getSortType = getSortType
}
