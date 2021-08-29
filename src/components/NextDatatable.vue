<template>
  <div class="next-datatable" :style="options.theme.styles">
    <div class="next-datatable__action">
      <NextDatatableActionLength :pagination="pagination" />
      <NextDatatableActionFilter :pagination="pagination" v-model:search="filters.search" />
    </div>
    <div class="next-datatable__table__wrapper">
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
                <template v-if="column.component">
                  <component :is="column.component" :rowData="row" :column="column" />
                </template>
                <template v-else>
                  {{ row[column.name] }}
                </template>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      <NextDatatableLoader v-if="isLoading" />
    </div>
    <div class="next-datatable__footer_action">
      <NextDatatableInfo :pagination="pagination" />
      <NextDatatablePagination v-model:pagination="pagination" :options="options.pagination" />
    </div>
  </div>
</template>

<script>
import NextDatatableLoader from './NextDatatableLoader.vue'
import NextDatatableActionLength from './NextDatatableActionLength.vue'
import NextDatatableActionFilter from './NextDatatableActionFilter.vue'
import NextDatatableInfo from './NextDatatableInfo.vue'
import NextDatatablePagination from './NextDatatablePagination.vue'
import NextDatatableWrapper from '../utils/NextDatatableWrapper'
import props from '../api/NextDatatableProps'

export default {
  components: {
    NextDatatableLoader,
    NextDatatableActionLength,
    NextDatatableActionFilter,
    NextDatatableInfo,
    NextDatatablePagination
  },
  props,
  setup(props, context) {
    const nextDatatable = new NextDatatableWrapper(props, context)

    return {
      nextDatatable,
      ...nextDatatable.getReferences()
    }
  }
}
</script>