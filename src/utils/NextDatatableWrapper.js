// lib
import {
  ref,
  reactive,
  computed,
  watch,
  getCurrentInstance,
  markRaw,
} from 'vue'
import merge from 'lodash.merge'
import NextDatatablePluginManager from './NextDatatablePluginManager'

// default options
import NextDatatableColumnDefaultOptions from '../api/NextDatatableColumnDefaultOptions'
import NextDatatableDefaultOptions from '../api/NextDatatableDefaultOptions'

// composable
import useRegisterLifeCycleComponent from '../api/useRegisterLifeCycleComponent'
import useModeClient from '../api/useModeClient'
import usePaginate from '../api/usePaginate'
import useSorting from '../api/useSorting'

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
    this.customColumns = []
    this.globalReferences = {}

    // watch props change or not]
    this.filters = reactive({
      search: '',
    })
    this.rows = reactive([])
    this.data = ref(this.initData(props.data))
    this.columns = ref(this.initColumns(props.columns))

    // Set loading true
    this.isLoading = ref(true)

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
    this.registerWatch()

    //
    this.loading(false)
  }

  loading(value = true) {
    this.isLoading.value = value
  }

  /**
   * Register a watch
   */
  registerWatch() {
    // watch props change or not
    watch(this.props, (props) => {
      this.emit('table:props-changed', props)
      this.data.value = this.initData(props.data)
      this.columns.value = this.initColumns(props.columns)
    })
    watch(this.data, (val) => this.emit('table:data-changed', val))
    watch(this.columns, (val) => this.emit('table:columns-changed', val))
    watch(this.rows, (val) => this.emit('table:rows-changed', val))
    watch(
      () => this.filters.search,
      (val) => this.emit('search:change', val)
    )
  }

  /**
   * Init data
   * @param  {Array} data
   */
  initData(data) {
    const result = []
    for (let i = 0; i < data.length; i++) {
      result.push(data[i])
    }
    return result
  }

  /**
   * Init Columns
   * @param  {Array} columns
   */
  initColumns(columns) {
    const result = []

    // base columns
    for (let i = 0; i < columns.length; i++) {
      let col = merge({ ...NextDatatableColumnDefaultOptions }, columns[i])

      // if colomn has component
      if (typeof col.component !== 'undefined') {
        col.component = markRaw(col.component)
        col.searchable = false
        col.sortable = false
      }

      //
      result.push(col)
    }

    // custom columns
    for (let i = 0; i < this.customColumns.length; i++) {
      const customColumn = this.customColumns[i]
      let col = merge(
        { ...NextDatatableColumnDefaultOptions },
        customColumn.column
      )
      if (customColumn.toIndex === null) customColumn.toIndex = result.length
      result.splice(customColumn.toIndex, 0, col)
    }

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

    // find and apply theme
    this.options.theme =
      this.nextDatatableOptions.themes.find(
        (theme) => theme.name == this.options.theme
      ) || null
    this.isDebug = this.nextDatatableOptions.debug
    this.mode = 'client'
    this.console('table', `Generated in ${this.mode} mode.`)
  }

  /**
   * Init the table
   */
  initTable() {
    // sorting
    useSorting(this)

    // pagination
    usePaginate(this)

    // search
    this.searchableColumns = computed(() =>
      this.columns.value.filter((column) => column.searchable !== false)
    )

    // handle data with specific mode
    if (this.mode == 'server') {
    } else if (this.mode == 'client') {
      this.client = useModeClient(this)
      this.rows = computed(() => this.client.rows.value)
    }
  }

  /**
   * Add column
   * @param  {Object} column - Column object
   * @param  {number} toIndex=null - Index to insert
   */
  addColumn(column, toIndex = null) {
    this.customColumns.push({
      column,
      toIndex,
    })
    this.columns.value = this.initColumns(this.props.columns)
  }

  /**
   * Search
   * @param  {string} value - Search value on the table
   */
  search(value) {
    this.filters.search = value
  }
  /**
   * Emit an event
   * @param  {string} name
   * @param  {} ...args
   */
  emit(name, ...args) {
    this.pluginManager.emit(name, ...args)

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
      nextdatatable: this,
      options: this.options,
      rows: this.rows,
      renderedColumns: this.columns,
      filters: this.filters,
      isLoading: this.isLoading,
    }
  }
}
