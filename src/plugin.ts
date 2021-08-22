import { App } from 'vue'
import { INextDatatableOptions } from './utils/types'
import NextDatatable from './components/NextDatatable.vue'

export default {
  install(app: App<Element>, options: INextDatatableOptions) {
    // Register component
    app.component('NextDatatable', NextDatatable)

    // Set global properties
    app.config.globalProperties.$nextDatatable = {
      options,
    }
    app.provide('$nextDatatable', options)
  },
}
