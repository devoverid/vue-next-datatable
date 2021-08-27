export default function install(nextDatatable, options) {
  const onTableInit = function () {
    console.log('MyExamplePlugin on table:init')
  }
  nextDatatable.addListener('table:init', onTableInit)
  console.log('My Example Plugin Installed')
}
