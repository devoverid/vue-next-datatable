<template>
  <div class="next-datatable">
    <div class="next-datatable__action">
      <div class="next-datatable__length">
        <select v-model="pagination.perPage">
          <option v-for="number in pagination.showEntriesBy" :key="number" :value="number">{{ number }}</option>
        </select>
      </div>
      <div class="next-datatable__filter">
        <label for="next-datatable__input" class="sr-only">Search :</label>
          <input
            id="next-datatable__input"
            type="text"
            placeholder="Search"
            v-model="search"
          />
      </div>
    </div>
    <table :class="{
      'next-datatable__table': true,
      [`next-datatable__table--${options.type}`]: true,
      [`next-datatable__table--${options.size}`]: true,
    }">
      <thead>
        <tr>
          <th v-for="(column, i) in columns" :key="i">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(column, j) in columns" :key="j">
            <slot :name="`row-${column.name}`" :rowData="row" :column="column">
              {{ row[column.name] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="next-datatable__footer_action">
      <NextDatatableInfo v-model:pagination="pagination" />
      <NextDatatablePagination v-model:pagination="pagination" :options="options.pagination" />
    </div>
  </div>
</template>

<script>
import NextDatatableInfo from './NextDatatableInfo.vue'
import NextDatatablePagination from './NextDatatablePagination.vue'
import NextDatatableWrapper from '../utils/NextDatatableWrapper'
import props from '../api/NextDatatableProps'
import useRegisterLifeCycleComponent from '../api/useRegisterLifeCycleComponent'

export default {
  components: {
    NextDatatableInfo,
    NextDatatablePagination
  },
  props,
  setup(props, context) {
    const nextDatatable = new NextDatatableWrapper(props, context)
  
    // use 
    useRegisterLifeCycleComponent(nextDatatable)
    
    return {
      nextDatatable,
      ...nextDatatable.getReferences()
    }
  }
}
</script>