# Basic Example

## Minimal
```html
<template>
  <NextDatatable :data="data" :columns="columns">
</template>
<script>
import { reactive } from 'vue'
export default {
  setup() {
    let data = reactive([
        { id: 1, name: 'John', age: 31, address: 'New York, US' },
        { id: 2, name: 'Tom', age: 27, address: 'California, US' }
    ])
    const columns = [
      { name: 'id', label: 'ID' },
      { name: 'name', label: 'Name' },
      { name: 'age', label: 'Age' },
      { name: 'address', label: 'Address' }
    ]

    return {
        data,
        columns
    }
  }
</script>
```

## Minimal With Custom Options
```html
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
