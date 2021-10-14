const plugin = {
  name: 'lineNumber',
  author: {
    name: 'Alfian Saugi',
    email: 'admin@devover.id',
  },
}

export default function install(nextdatatable, options) {
  const onTableInit = function () {
    nextdatatable.console(plugin.name, 'VueNextDatatable on table:init')
  }
  nextdatatable.addListener('table:init', onTableInit)
  nextdatatable.console(plugin.name, 'Vue Next Datatable Installed')
}
