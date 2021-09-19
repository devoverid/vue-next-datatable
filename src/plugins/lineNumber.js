const plugin = {
  name: 'lineNumber',
  author: {
    name: 'Alfian Dwi Nugraha',
    email: 'fiandwi0424@gmail.com',
  },
}

const onTableInit = function () {
  this.console(plugin.name, 'Line Number Init')
}

const injectNumberToRowsServerMode = function () {
  const rows = this.server.data.value
  const firstIndex = this.pagination.firstItemIndex
  if (rows) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].number = firstIndex + i
    }
  }
}

const injectNumberToRows = function () {
  const rows = this.data.value
  if (rows) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].number = i + 1
    }
  }
}

const injectNumberToColumns = function () {
  this.addColumn(
    {
      name: 'number',
      label: '#',
    },
    0
  )
}

export default function install(nextdatatable, options) {
  nextdatatable.addListener('table:init', onTableInit.bind(nextdatatable))
  nextdatatable.addListener(
    'table:init',
    injectNumberToColumns.bind(nextdatatable)
  )
  nextdatatable.addListener(
    'table:data-changed',
    injectNumberToRows.bind(nextdatatable)
  )
  nextdatatable.addListener(
    'table:server:data-changed',
    injectNumberToRowsServerMode.bind(nextdatatable)
  )
}
