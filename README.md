# vue-next-datatable

[![Build Status](https://github.com/devoverid/vue-next-datatable/workflows/test/badge.svg)](https://github.com/devoverid/vue-next-datatable/actions/workflows/test.yml)
[![npm package](https://badgen.net/npm/v/vue-next-datatable)](https://www.npmjs.com/package/vue-next-datatable)
[![coverage](https://badgen.net/codecov/c/github/devoverid/vue-next-datatable/main)](https://codecov.io/github/devoverid/vue-next-datatable/branch/main)
[![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/devoverid/thanks)
![GitHub last commit](https://img.shields.io/github/last-commit/devoverid/vue-next-datatable.svg)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/badges/shields.svg)
[![License](https://img.shields.io/github/license/devoverid/vue-next-datatable.svg)](LICENSE)
![npm version](https://badge.fury.io/js/yarn.svg)


## Vue Next Datatable

Vue Next Datatable is a Lightweight Datatable for Vue 3, Inspiration from DataTables.


## Features

- [x] Search
- [x] Filter
- [x] Pagination
- [x] Sort
- [x] Plugin System
- [x] Server-side
- [x] Customable Theme

## Overview

### Simple Usage
Install to vue
```
import { createApp } from 'vue'
import NextDatatable from 'vue-next-datatable'

const app = createApp(App)

const options = { debug: false }
app.use(NextDatatable, options)

app.mount('#app')
```
Add to your component
```html
<template>
  <NextDatatable :data="data" :columns="columns" :options="{}">
</template>
<script>
import { reactive } from 'vue'

export default {
  setup() {
    let data = reactive([
      {
        id: 1,
        name: 'Alfian Dwi Nugraha',
        age: 19,
        address: 'Surabaya, East Java, Indonesia.'
      }
    ])

    let columns = [
      {
        name: 'id',
        label: 'ID',
      },
      {
        name: 'name',
        label: 'Name',
      },
      {
        name: 'age',
        label: 'Age',
      },
      {
        name: 'address',
        label: 'Address',
      },
    ]

    return {
      data,
      columns,
    }
  }
}
</script>
```

### Table Options

| Key | Type | Description | Default Value |
|---|---|---|---|
| perPage | number | number of items displayed in one page | 10 |
| showEntriesBy | array | number of items allowed to view per page | [10, 20, 50, 100] |
| type | string | type table style `bordered` or `borderless` | 'bordered' |
| size | string | size of table | 'md' |
| server | object | remote server option | {...} |
| server.url | string | url of server api | '' |
| pagination | object | pagination option | {...} |
| pagination.position | string | position pagination | 'end' |
| pagination.type | string | type pagination style `extended` or `minimal` | 'extended' |
| pagination.activeColor | string | button color on active | '#185ADB' |

### VueNextTable Options

| Key | Type | Description | Default |
|---|---|---|---|
| defaults | object | table options | { ...TableOptions } |
| debug | boolean | view emit dispatch & error handler | true |
| plugins | array<function> | register plugins | [] |
| themes | array<object> | register themes | [] |

### Example Plugin

Create your plugin file
```
# myExamplePlugin.js

export default function install(nextDatatable, options) {
  // this is function called when table:init event
  const onTableInit = function () {
    console.log('MyExamplePlugin on table:init')
  }

  // register function to event listener
  nextDatatable.addListener('table:init', onTableInit)

  //
  console.log('My Example Plugin Installed')
}
```
And then register your plugin in global options
```
import NextDatatable from 'vue-next-datatable'
import MyExamplePlugin from './plugins/MyExamplePlugin'

const app = createApp(App)
const options = {
  ...
  plugins: [MyExamplePlugin],
}
app.use(NextDatatable, options)
app.mount('#app')
```

### Events

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


## Contributing

You can follow the contributing guide listed [here](./.github/CONTRIBUTING.md)


## Contributors

<a href="https://github.com/devoverid/vue-next-datatable/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=devoverid/vue-next-datatable"/>
</a>


## License

Vue Next Datatable is open-sourced software licensed under the [MIT](http://opensource.org/licenses/MIT)