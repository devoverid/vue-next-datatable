import { createApp } from 'vue'
import App from './App.vue'
import NextDatatable from '../../src'

const app = createApp(App)

const options = {
  defaults: {
    perPage: 5,
    showEntriesBy: [10, 20, 100],
  },
}
app.use(NextDatatable, options)

app.mount('#app')
