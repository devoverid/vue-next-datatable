<template>
  <div class="container">
    <NextDatatable
      ref="table"
      :data="data"
      :columns="columns"
      :options="options"
    >
      <template #row-action="{ rowData }">
        <button>Update {{ rowData.id }}</button>
      </template>
    </NextDatatable>
    <button @click="add">add random data</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import Status from './Status.vue'

export default {
  setup(props, context) {
    // access nextdatatable component
    const table = ref(null)

    // nextdatatable props
    const options = {
      perPage: 5,
      sort: {
        mode: 'multiple',
      },
    }
    const data = reactive([])
    const columns = [
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
        name: 'action',
        label: 'Action',
        searchable: false,
        sortable: false,
      },
    ]

    // methods
    const availableStatus = ['Pending', 'Success', 'Failed']
    const makeid = (length) => {
      var result = ''
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
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
      table,
    }
  },
}
</script>
