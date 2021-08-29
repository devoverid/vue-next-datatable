---
lang: en-US
title: Getting Started
description: This page describes how to getting started to use vue-next-datatable.
---
# Getting Started

## Installation

You can install `vue-next-datatable` package through npm, yarn, or other node package manager as well.

```bash
# using npm
npm install vue-next-datatable

# using yarn
yarn add vue-next-datatable
```

## Basic Usage

After the library is downloaded using package manager, import and use it by `app.use()`

`app.js`
```js{3,7-8}
import { createApp } from 'vue'
import App from './App.vue'
import NextDatatable from 'vue-next-datatable'

const app = createApp(App)

const options = { debug: true }
app.use(NextDatatable, options)

app.mount('#app')
```
The `options` object is optional. Check [Options API](/api/options.md) for more details.

Use vue-next-datatable in your Vue component:

```vue
<template>
  <NextDatatable :data="data" :columns="columns" :options="options">
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const data = reactive([
        { id: 1, name: 'John', age: 31, address: 'New York, US' },
        { id: 2, name: 'Tom', age: 27, address: 'California, US' }
    ])
    const columns = [
      { name: 'id', label: 'ID' },
      { name: 'name', label: 'Name' },
      { name: 'age', label: 'Age' },
      { name: 'address', label: 'Address' }
    ]
    const options = {
        perPage: 5,
        showEntriesBy: [5, 10, 20, 100],
    }

    return {
        data,
        columns,
        options
    }
  }
</script>
```