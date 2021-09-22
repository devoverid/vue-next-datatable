---
lang: en-US
title: Plugins
description: This page describes how to install plugins in vue-next-datatable.
---

# Plugins
## Built-in Plugins
We provide several built-in plugins that you can use right away.

### Line Number
Automatically add numbers in the first column of your table

`app.js`
```js{5,11}
import { createApp } from 'vue'
import App from './App.vue'

import NextDatatable from 'vue-next-datatable'
import LineNumber from 'vue-next-datatable/plugins/lineNumber'

const app = createApp(App)

const options = {
    debug: true,
    plugins: [LineNumber]
}
app.use(NextDatatable, options)

app.mount('#app')
```

## Event List
We provide a list of events that you can use to add your callback listeners.

#### Component

| Event Name         | Description                       | Parameter                              |
|--------------------|-----------------------------------|----------------------------------------|
| on:before-mount    | On Table Component Before Mount   |                                        |
| on:mounted         | On Table Component Mounted        |                                        |
| on:before-unmount  | On Table Component Before Unmount |                                        |
| on:unmounted       | On Table Component Unmounted      |                                        |
| on:activated       | On Table Component Before Mount   |                                        |
| on:deactivated     | On Table Component Before Mount   |                                        |
| wrapper:init       | On NextDatatableWrapper Construct |                                        |

#### Pagination
| Event Name         | Description                       | Parameter                              |
|--------------------|-----------------------------------|----------------------------------------|
| pagination:change  | When Pagination Value Change      | `pagination: object`                   |
| pagination:before-navigate | When pagination navigate | `toPage: number, fromPage: number` |
| pagination:navigated | after pagination navigate | `toPage: number, fromPage: number` |

#### Filters
| Event Name         | Description                       | Parameter                              |
|--------------------|-----------------------------------|----------------------------------------|
| search:change      | When Search Value Change          | `search: string`                       |

#### Table
| Event Name         | Description                       | Parameter                              |
|--------------------|-----------------------------------|----------------------------------------|
| table:init         | On Before Table Init              |                                        |
| table:data-changed | When Data in Props Changed        | `data: array`                          |
| table:rows-changed | When Rows Re-render               | `rows: array`                          |
| table:props-changed| When Rows Re-render               | `search: object`                       |
| table:thead:column:click | when table head column click | `column: object` |
| table:tfood:column:click | when table foot column click | `column: object` |
| table:tbody:column:click | when table body column click | `row: object`, `column: object` |

#### Table Server Mode
| Event Name         | Description                       | Parameter                              |
|--------------------|-----------------------------------|----------------------------------------|
| table:server:data-changed | when data from fetch changed | `data: array`
| table:server:rows-changed | when rows changed | `rows: array`
| table:server:fetch | when fetch data trigger |  |
| table:server:fetch-complete | when fetch data complete no error | `response: object` |
| table:server:fetch-error | when fetch data error | `error: object` |
| table:server:fetch-finally | when fetch data finally complete |  |

## Create Your Own Plugin
you can create your own plugin quickly and easily.

**Create your plugin file**

`/plugins/myplugin.js`
```js
const plugin = {
  name: 'MyPlugin',
  author: {
    name: 'Alfian Dwi Nugraha',
    email: 'fiandwi0424@gmail.com',
  }
}

const onTableInit = function () {
    this.console(plugin.name, 'My Plugin Called In Event table:init')
}

export default function install(nextdatatable, options) {
    nextdatatable.addListener('table:init', onTableInit.bind(nextdatatable))
}
```
**Register your plugin**

`app.js`
```js{5,9}
import { createApp } from 'vue'
import App from './App.vue'

import NextDatatable from 'vue-next-datatable'
import MyPlugin from '@/plugins/myplugin'

const app = createApp(App)
const options = {
    plugins: [MyPlugin]
}
app.use(NextDatatable, options)
app.mount('#app')
```