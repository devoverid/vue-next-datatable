---
lang: en-US
title: Customization
description: This page describes how customization component
---
# Customization

## Custom Row
Sometimes you might want to customize exactly how rows are displayed in a table
```vue
<template>
  <NextDatatable :data="data" :columns="columns" :options="options">
    <template #row-address="{ rowData }">
      <span class="text-red-500">
        {{ rowData.address }}
      </span>
    </template>
  </NextDatatable>
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

## Custom Column
Sometimes you might want to add columns to the table that are not part of your row data.
```vue
<template>
  <NextDatatable :data="data" :columns="columns" :options="options">
    <template #row-action="{ rowData }">
      <button>This is button to See data with {{ rowData.id }}</button>
    </template>
  </NextDatatable>
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
      { name: 'address', label: 'Address' },
      { name: 'action', label: 'Action', searchable: false, sortable: false }
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

## Custom Action Filter
You can also directly add filter actions to datatable component

```vue{3-15}
<template>
  <NextDatatable :data="data" :columns="columns">
    <template #action="{ filters }">
      <div class="action">
        <div>
          <label for="inputFilterStatus">Filter Status : </label>
          <select id="inputFilterStatus" v-model="filters.status">
            <option value="undefined">-- select --</option>
            <option v-for="(item, i) in availableStatus" :key="i" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
    </template>
  </NextDatatable>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {    
    const data = reactive([
        { id: 1, name: 'John', status: 'Pending' },
        { id: 2, name: 'Tom', status: 'Success' }
    ])
    const columns = [
      { name: 'id', label: 'ID' },
      { name: 'name', label: 'Name' },
      { name: 'status', label: 'Status' }
    ]
    const availableStatus = ['Pending', 'Success', 'Failed']

    return {
        data,
        columns,
        availableStatus
    }
  }
</script>
```