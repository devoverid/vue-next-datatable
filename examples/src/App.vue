<template>
  <NextDatatable :data="data" :columns="columns" :options="options">
    <template v-slot:row-action="{ rowData }">
      <button>Update {{ rowData.id }}</button>
      <button>Delete {{ rowData.name }}</button>
    </template>
  </NextDatatable>
</template>

<script setup>
import { defineComponent } from 'vue'

let data = [
  {
    id: 1,
    name: 'John',
    age: 32,
    address: 'New York No. 1',
    action: '',
  },
  {
    id: 2,
    name: 'Tom',
    age: 32,
    address: 'New York No. 2',
    action: '',
  }
]

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
  {
    name: 'action',
    label: 'Action',
    searchable: false,
    sortable: false,
  },
]
let options = {
  showEntriesBy: [10,20,100],
}
</script>

