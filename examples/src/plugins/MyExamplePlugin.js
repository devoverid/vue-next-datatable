export default function install(nextDatatable, options) {
  nextDatatable.addListener('table:init', function () {
    console.log('MyExamplePlugin on table:init')
  })
  console.log('My Example Plugin Installed')
}
