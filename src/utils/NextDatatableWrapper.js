import { ref, reactive, computed, watch, getCurrentInstance } from 'vue'
import NextDatatablePluginManager from './NextDatatablePluginManager'
import NextDatatableDefaultOptions from '../api/NextDatatableDefaultOptions'
import useModeClient from '../api/useModeClient'
import usePaginate from '../api/usePaginate'

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
    this.globalReferences = {}

    //
    this.isLoading = true

    // OPTIONS
    this.vueInstance = getCurrentInstance()
    this.nextDatatableOptions =
      this.vueInstance.appContext.config.globalProperties.$nextDatatable.options
    this.isDebug = this.nextDatatableOptions.debug || true

    // PLUGIN SYSTEM
    this.listeners = []
    this.pluginManager = new NextDatatablePluginManager(this)
    this.pluginManager.register(this.nextDatatableOptions.plugins || [])
    this.pluginManager.load()

    //
    this.emit('wrapper:init')

    // init options
    this.initOptions()

    // init table
    this.emit('table:init')
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
    // main
    this.rows = reactive([])

    // pagination
    usePaginate(this)

    // search
    this.search = ref('')
    watch(this.search, (oldValue, newValue) =>
      this.emit('search:change', { oldValue, newValue })
    )
    this.searchableColumns = computed(() =>
      this.props.columns.filter((column) => column.searchable !== false)
    )

    // handle data with specific mode
    if (this.mode == 'server') {
    } else if (this.mode == 'client') {
      this.client = useModeClient(this)
      this.rows = computed(() => this.client.rows.value)
      watch(this.props.data, () => this.emit('table:data-changed'))
      watch(this.rows, () => this.emit('table:rows-changed'))
    }
  }

  refresh() {
    this.emit('on:refresh')
  }

  search() {
    this.emit('on:search')
  }

  /**
   * Emit an event
   * @param  {string} name - name of the event
   * @param  {any} data=undefined - data to send
   */
  emit(name, data = undefined) {
    this.pluginManager.emit(name, data)

    // for debug mode
    if (typeof data !== 'undefined') {
      this.console('event', `name: ${name}`)
      console.log(data)
    } else {
      this.console('event', `name: ${name}`)
    }
  }

  /**
   * @param  {string} name - name of the event
   * @param  {void} callback - callback function
   * @param  {number} priority=20 - priority of the event
   */
  addListener(name, callback, priority = 20) {
    this.listeners.push({ name, callback, priority })
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
      ...this.globalReferences,
      options: this.options,
      rows: this.rows,
      search: this.search,
    }
  }
}
