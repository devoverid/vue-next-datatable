import { createApp } from 'vue'
import App from './App.vue'
import NextDatatable from '../../src'
import MyExamplePlugin from './plugins/MyExamplePlugin'

const app = createApp(App)

const options = {
  debug: true,
  defaults: {
    perPage: 5,
    showEntriesBy: [1, 5, 10, 20, 100],
  },
  plugins: [MyExamplePlugin],
}
app.use(NextDatatable, options)

app.mount('#app')
