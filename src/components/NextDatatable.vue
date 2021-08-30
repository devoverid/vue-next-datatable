<template>
  <div class="next-datatable" :style="options.theme.styles">
    <!-- nextdatatable:action -->
    <div class="next-datatable__action">
      <!-- nextdatatable:action-length -->
      <NextDatatableActionLength :pagination="pagination" />
      <!-- nextdatatable:action-filter -->
      <NextDatatableActionFilter :pagination="pagination" v-model:search="filters.search" />
    </div>
    <div class="next-datatable__table__wrapper">
      <!-- nextdatatable:table -->
      <table
        :class="{
          'next-datatable__table': true,
          [`next-datatable__table--${options.type}`]: true,
          [`next-datatable__table--${options.size}`]: true,
        }"
      >
        <!-- nextdatatable:table-head -->
        <thead>
          <tr>
            <template v-for="(column, i) in renderedColumns" :key="i">
              <th
                :class="{
                  'sortable': column.sortable,
                  'sort_desc': getSortType(column, order) === 'desc',
                  'sort_asc': getSortType(column, order) === 'asc',
                }"
                @click="nextdatatable.emit('table:thead:column:click', column)"
              >
                {{ column.label }}
              </th>
            </template>
          </tr>
        </thead>
        <!-- nextdatatable:table-body -->
        <tbody>
          <tr v-for="(row, i) in rows" :key="i">
            <td v-for="(column, j) in renderedColumns" :key="j">
              <slot :name="`row-${column.name}`" :rowData="row" :column="column">
                <template v-if="column.component">
                  <component
                    :is="column.component"
                    :rowData="row"
                    :column="column"
                    v-model:nextdatatable="nextdatatable"
                  />
                </template>
                <template v-else>
                  {{ row[column.name] }}
                </template>
              </slot>
            </td>
          </tr>
        </tbody>
        <!-- nextdatatable:table-tfoot -->
        <tfoot>
          <tr>
            <th
              v-for="(column, i) in renderedColumns"
              :key="i"
              @click="nextdatatable.emit('table:tfoot:column:click')"
            >
              {{ column.label }}
            </th>
          </tr>
        </tfoot>
      </table>
      <!-- nextdatatable:loader -->
      <NextDatatableLoader v-if="isLoading" />
    </div>
    <!-- nextdatatable:footer-action -->
    <div class="next-datatable__footer_action">
      <!-- nextdatatable:footer-action-info -->
      <NextDatatableInfo :pagination="pagination" />
      <!-- nextdatatable:footer-action-pagination -->
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
    const nextdatatable = new NextDatatableWrapper(props, context)

    return {
      nextdatatable,
      ...nextdatatable.getReferences(),
    }
  }
}
</script>