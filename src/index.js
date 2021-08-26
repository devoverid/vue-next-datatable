import NextDatatable from './components/NextDatatable.vue'

const install = (app, options) => {
  // Register component
  app.component('NextDatatable', NextDatatable)

  // Set global properties
  app.config.globalProperties.$nextDatatable = {
    options,
  }

  // Provide the global properties
  app.provide('$nextDatatable', options)
}

export default install

export { NextDatatable }
