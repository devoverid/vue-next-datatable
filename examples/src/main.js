import { createApp } from 'vue'
import App from './App.vue'

// vue next datatable
import NextDatatable from '../../src'
import '../../src/scss/main.scss'

// plugins
import LineNumber from '../../src/plugins/lineNumber'

// custom plugins
import MyExamplePlugin from './plugins/MyExamplePlugin'

const app = createApp(App)

const options = {
  debug: true,
  defaults: {
    perPage: 5,
    showEntriesBy: [5, 10, 20, 100],
  },
  plugins: [MyExamplePlugin, LineNumber],
}
app.use(NextDatatable, options)

app.mount('#app')
