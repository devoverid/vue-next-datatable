const plugin = {
  name: 'lineNumber',
  author: {
    name: 'Alfian Saugi',
    email: 'admin@devover.id',
  },
}

export default function install(nextdatatable, options) {
  const onTableInit = function () {
    nextdatatable.console(plugin.name, 'MyExamplePlugin on table:init')
  }
  nextdatatable.addListener('table:init', onTableInit)
  nextdatatable.console(plugin.name, 'My Example Plugin Installed')
}
