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
    theme: 'minimalist',
    perPage: 5,
    showEntriesBy: [5, 10, 20, 100],
  },
  plugins: [MyExamplePlugin, LineNumber],
  themes: [
    {
      name: 'minimalist',
      styles: {
        '--theme-primary': 'rgb(58, 166, 117)',
        '--pagination-button-color-disabled': '#8c8c8c',
      },
    },
  ],
}
app.use(NextDatatable, options)

app.mount('#app')
