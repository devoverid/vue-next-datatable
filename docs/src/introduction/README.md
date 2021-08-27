# Installation

Vue Next Datatable is a very lightweight and powerful table component. written with inspiration from Datatables, made especially for Vue 3.
Vue Next Datatable has a plugin system so anyone can integrate their ideas and publish them for others easily and quickly.

## npm
```
# npm
npm install vue-next-datatable
```

## yarn
```
# yarn
yarn add vue-next-datatable
```

## Import to your Vue 3
```
import { createApp } from 'vue'
import App from './App.vue'
import NextDatatable from 'vue-next-datatable'

const app = createApp(App)

const options = { debug: true }
app.use(NextDatatable, options)

app.mount('#app')
```

