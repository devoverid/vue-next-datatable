const plugin = {
  name: 'lineNumber',
}

const onTableInit = function () {
  this.console(plugin.name, 'Plugin Init')
}

const injectNumberToRows = function (rows) {
  if (rows) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].number = i + 1
    }
  }
  return rows
}

const injectNumberToColumns = function (columns) {
  const colNumberExist = columns.find((col) => col.name === 'number')
  if (!colNumberExist) {
    columns.unshift({
      name: 'number',
      label: '#',
    })
  }
  return columns
}

export default function install(nextDatatable, options) {
  nextDatatable.addListener('table:init', onTableInit.bind(nextDatatable))
  nextDatatable.addHook(
    'table:columns',
    injectNumberToColumns.bind(nextDatatable)
  )
  nextDatatable.addHook(
    'table:client:rows',
    injectNumberToRows.bind(nextDatatable)
  )
}
