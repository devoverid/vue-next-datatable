export default class NextDatatablePluginManager {
  /**
   * Register a listener
   * @param  {NextDatatableWrapper} wrapper
   */
  constructor(wrapper) {
    this.registeredPlugins = []
    this.wrapper = wrapper
    this.listeners = []
    this.hooks = []
  }

  /**
   * Register a plugin
   * @param  {Array|Function|void} plugins - plugin to register
   */
  register(plugins) {
    if (Array.isArray(plugins)) {
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i]
        this.registeredPlugins.push(plugin)
      }
    } else {
      this.registeredPlugins.push(plugins)
    }
  }

  /**
   * Load all registered plugins
   */
  load() {
    this.registeredPlugins.forEach((plugin) => {
      if (plugin && typeof plugin.install === 'function')
        plugin.install(this.wrapper)
      if (plugin && typeof plugin === 'function') plugin(this.wrapper)
    })
  }

  /**
   * Emit event to all registered plugins
   * @param  {string} name - name of the event
   * @param  {any} data=undefined - data to send
   */
  emit(name, data = undefined) {
    const listeners = this.listeners
      .filter((listener) => listener.name == name)
      .sort((a, b) => a.priority - b.priority)
    for (let i = 0; i < listeners.length; i++) {
      try {
        listeners[i].callback(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * Call all hook with the same name and return the result
   * @param  {string} name
   * @param  {any} value
   * @param  {any} ...args
   */
  applyHook(name, value, ...args) {
    const hooks = this.hooks
      .filter((hook) => hook.name == name)
      .sort((a, b) => a.priority - b.priority)

    let result = undefined
    if (Array.isArray(result)) {
      result = [...result]
    } else if (typeof result === 'object') {
      result = { ...result }
    } else {
      result = value
    }
    for (let i = 0; i < hooks.length; i++) {
      try {
        result = hooks[i].callback(result, ...args)
      } catch (error) {
        console.log(error)
      }
    }
    return result
  }
}
