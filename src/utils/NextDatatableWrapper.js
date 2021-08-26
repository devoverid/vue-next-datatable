import { ref, computed, watch, getCurrentInstance } from 'vue'
import NextDatatableDefaultOptions from '../api/NextDatatableDefaultOptions'

/**
 * Wrapper Fot the Datatable component
 * @class NextDatatableWrapper
 */
export default class NextDatatableWrapper {
  /**
   * Create Wrapper for Datatable
   * @param  {Prop} props - Datatable Props
   * @param  {SetupContext} context - Vue component Context
   */
  constructor(props, context) {
    this.props = props
    this.context = context

    //
    this.isLoading = true

    //
    this.vueInstance = getCurrentInstance()
    this.nextDatatableOptions =
      this.vueInstance.appContext.config.globalProperties.$nextDatatable.options
    this.isDebug = this.nextDatatableOptions.debug || true

    //
    this.console('table', 'Init')

    // init options
    this.initOptions()

    // init table
    this.initTable()

    //
    this.isLoading = false
  }

  /**
   * Init options
   */
  initOptions() {
    this.options = Object.assign(
      NextDatatableDefaultOptions,
      this.nextDatatableOptions.defaults,
      this.props.options
    )
    this.mode = 'client'
    this.console('table', `Generated in ${this.mode} mode.`)
  }

  /**
   * Init the table
   */
  initTable() {
    this.rows = ref([])

    // search
    this.search = ref('')
    watch(this.search, (oldValue, newValue) =>
      this.emit('search:change', { oldValue, newValue })
    )
    this.searchableColumns = computed(() =>
      this.props.columns.filter((column) => column.searchable !== false)
    )

    if (this.mode == 'server') {
    } else if (this.mode == 'client') {
      this.rows = computed(() => {
        const data = this.props.data
        const filteredDataBySearch = data.filter((row) => {
          let result = false
          for (let i = 0; i < this.searchableColumns.value.length; i++) {
            const column = this.searchableColumns.value[i]
            const columnValue = `${row[column.name]}`.toLowerCase()
            const included = columnValue.includes(`${this.search.value}`)
            if (included) {
              result = true
              break
            }
          }
          return result
        })
        return filteredDataBySearch
      })
    }
  }

  /**
   * Emit an event
   * @param  {string} name - name of the event
   * @param  {any} data=undefined - data to send
   */
  emit(name, data = undefined) {
    if (data) {
      this.console('event', `name: ${name}`)
      console.log(data)
    } else {
      this.console('event', `name: ${name}`)
    }
  }

  /**
   * Debug console
   * @param  {string} grup
   * @param  {string} text
   */
  console(grup, text) {
    if (this.isDebug)
      console.log(`[NextDatatableDebug] [${grup.toLocaleUpperCase()}] ${text}`)
  }

  /**
   * Get all references for the table
   * @returns {Object}
   */
  getReferences() {
    return {
      options: this.options,
      rows: this.rows,
      search: this.search,
    }
  }
}
