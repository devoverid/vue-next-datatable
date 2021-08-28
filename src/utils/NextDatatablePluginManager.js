export default class NextDatatablePluginManager {
  /**
   * Register a listener
   * @param  {NextDatatableWrapper} wrapper
   */
  constructor(wrapper) {
    this.registeredPlugins = []
    this.wrapper = wrapper
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
    const listeners = this.wrapper.listeners
      .filter((listener) => listener.name == name)
      .sort((a, b) => a.priority - b.priority)
    for (let i = 0; i < listeners.length; i++) {
      try {
        listeners[i].callback(data)
      } catch (error) {}
    }
  }
}
