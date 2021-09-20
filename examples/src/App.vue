<template>
<div class="container">
  <NextDatatable ref="table" :data="data" :columns="columns" :options="options">
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
    <template #row-action="{ rowData }">
      <button>Update {{ rowData.id }}</button>
    </template>
  </NextDatatable>
  <button @click="add">add random data</button>
  <button @click="test">test loader</button>
</div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import Status from './components/Status.vue'

export default {
  setup(props, context) {
    // access nextdatatable component
    const table = ref(null)

    // nextdatatable props
    const options = {
      server: {
        url: 'http://localhost:8000/test'
      },
      perPage: 5,
      sort: {
        mode: 'multiple'
      }
    }
    const data = reactive([])
    const columns = ([
      {
        name: 'id',
        label: 'ID',
      },
      {
        name: 'name',
        label: 'Name',
      },
      {
        name: 'status',
        label: 'Status',
        component: Status,
      },
      {
        name: 'detail.address',
        label: 'Address',
      },
      {
        name: 'detail.phone',
        label: 'Phone Number',
      },
      {
        name: 'custom',
        label: 'custom',
        searchable: false,
        sortable: false,
      },
      {
        name: 'action',
        label: 'Action',
        searchable: false,
        sortable: false,
      },
    ])

    // methods
    const availableStatus = ['Pending', 'Success', 'Failed']
    const makeid = (length) => {
      var result           = ''
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    }
    const makestatus = () => {
      return availableStatus[Math.floor(Math.random() * availableStatus.length)]
    }

    // add data
    const add = () => {
      const rand = Math.round(Math.random() * 100)
      data.push({
        id: makeid(10),
        name: `Random - ${rand}`,
        address: `Random - ${rand}`,
        status: makestatus(),
        action: '',
      })
    }

    // test
    const test = () => {
      const nextdatatable = table.value.nextdatatable
      nextdatatable.loading(true)
      setTimeout(() => {
        nextdatatable.loading(false)
      }, 1000)
    }

    // on mount
    onMounted(() => {
      for (let i = 0; i < 1000; i++) {
        add()
      }
    })

    return {
      options,
      data,
      columns,
      availableStatus,
      add,
      test,
      table
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');

.container {
  width: min(100%, 720px);
  margin: 0 auto;
  font-family: 'Noto Sans JP', sans-serif;
  margin-top: 3rem;
}

.action {
  display: flex;
  justify-content: space-between;
  margin-bottom: .5rem;
  padding-bottom: .5rem;
  width: 100%;;
  border-bottom: 1px solid rgb(190, 190, 190);
}
</style>