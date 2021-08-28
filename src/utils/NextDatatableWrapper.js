// lib
import { ref, reactive, computed, watch, getCurrentInstance } from 'vue'
import merge from 'lodash.merge'
import NextDatatablePluginManager from './NextDatatablePluginManager'

// default options
import NextDatatableColumnDefaultOptions from '../api/NextDatatableColumnDefaultOptions'
import NextDatatableDefaultOptions from '../api/NextDatatableDefaultOptions'

// composable
import useRegisterLifeCycleComponent from '../api/useRegisterLifeCycleComponent'
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
    //
    this.props = props
    this.context = context
    this.filters = reactive({
      search: '',
    })
    this.globalReferences = {}

    // watch props change or not
    this.data = reactive(props.data)
    this.columns = reactive(props.columns)
    watch(this.props, (props) => {
      // emit event
      this.emit('table:props-changed', props)

      // apply hook
      const columns = this.applyHook(
        'table:columns',
        this.initColumns(props.columns)
      )
      const data = this.applyHook('table:client:data', props.data)
      this.data = reactive(data)
      this.columns = reactive(columns)
    })

    // Set loading true
    this.isLoading = true

    // Get options
    this.vueInstance = getCurrentInstance()
    this.initOptions(
      this.vueInstance.appContext.config.globalProperties.$nextDatatable.options
    )

    // Register lifecycle component to events
    useRegisterLifeCycleComponent(this)

    // Plugin Manager
    this.pluginManager = new NextDatatablePluginManager(this)
    this.pluginManager.register(this.nextDatatableOptions.plugins || [])
    this.pluginManager.load()
    this.emit('wrapper:init')

    // init table
    this.emit('table:init')
    this.initTable()

    //
    this.isLoading = false
  }

  initColumns(columns) {
    const result = []
    for (let i = 0; i < columns.length; i++) {
      const col = merge({ ...NextDatatableColumnDefaultOptions }, columns[i])
      result.push(col)
    }
    console.log(result)
    return result
  }

  /**
   * Init options
   */
  initOptions(globalOptions) {
    // merge options
    this.nextDatatableOptions = merge(
      // default options
      NextDatatableDefaultOptions,
      // global options from config
      globalOptions
    )
    this.nextDatatableOptions.defaults = merge(
      // default options
      NextDatatableDefaultOptions.defaults,
      // local options from component props
      this.props.options
    )

    // apply options
    this.options = this.nextDatatableOptions.defaults
    this.isDebug = this.nextDatatableOptions.debug
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
    this.filters.search = ''
    watch(
      () => this.filters.search,
      (val) => this.emit('search:change', val)
    )
    this.searchableColumns = computed(() =>
      this.props.columns.filter((column) => column.searchable !== false)
    )

    // handle data with specific mode
    if (this.mode == 'server') {
    } else if (this.mode == 'client') {
      this.client = useModeClient(this)
      this.rows = computed(() => this.client.rows.value)
      watch(this.data, (val) => this.emit('table:data-changed', val))
      watch(this.rows, (val) => this.emit('table:rows-changed', val))
    }
  }

  /**
   * Search
   * @param  {} value - Search value on the table
   */
  search(value) {
    this.emit('on:search')
    this.filters.search = value
  }

  /**
   * Emit an event
   * @param  {string} name - name of the event
   * @param  {any} data=undefined - data to send
   */
  emit(name, data = undefined) {
    this.pluginManager.emit(name, data)

    // for debug mode
    this.console('event', `name: ${name}`)
  }

  /**
   * Register a listener for an event
   * @param  {string} name - name of the event
   * @param  {void} callback - callback function
   * @param  {number} priority=20 - priority of the event
   */
  addListener(name, callback, priority = 20) {
    this.pluginManager.listeners.push({ name, callback, priority })
  }

  /**
   * Register a hook
   * @param  {string} name - name of the event
   * @param  {void} callback - callback function
   * @param  {number} priority=20 - priority of the event
   */
  addHook(name, callback, priority = 20) {
    this.pluginManager.hooks.push({ name, callback, priority })
  }

  /**
   * Call all hook with the same name and return the result
   * @param  {string} name
   * @param  {any} value
   * @param  {any} ...args
   */
  applyHook(name, value, ...args) {
    return this.pluginManager.applyHook(name, value, ...args)
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
      filters: this.filters,
    }
  }
}
