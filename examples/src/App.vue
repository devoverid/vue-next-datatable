<template>
<div class="container">
  <NextDatatable :data="data" :columns="columns" :options="{}">
    <template #row-action="{ rowData }">
      <button>Update {{ rowData.name }}</button>
      <button>Delete {{ rowData.name }}</button>
    </template>
  </NextDatatable>
  <button @click="add">add random</button>
</div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'

export default {
  setup() {
    let data = reactive([])

    let columns = reactive([
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
    ])

    const add = () => {
      const rand = Math.round(Math.random() * 100)
      data.push({
        id: data.length + 1,
        name: `Random - ${rand}`,
        age: rand,
        address: `Random - ${rand}`,
        action: '',
      })
    }

    onMounted(() => {
      for (let i = 0; i < 25; i++) {
        add()
      }
    })

    return {
      data,
      columns,
      add
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

.container {
  width: min(100vw, 720px);
  margin: 0 auto;
  font-family: 'Noto Sans JP', sans-serif;
  margin-top: 3rem;
}
</style>