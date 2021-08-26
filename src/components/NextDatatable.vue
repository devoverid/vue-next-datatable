<template>
  <div class="next-datatable">
    <div class="next-datatable__action">
      <div class="next-datatable__length">
        <select>
          <option v-for="number in options.showEntriesBy" :key="number" value="number">{{ number }}</option>
        </select>
      </div>
      <div class="next-datatable__filter">
        <label>
          Search :
          <input
            type="text"
            placeholder="Search"
            v-model="search"
          />
        </label>
      </div>
    </div>
    <table class="next-datatable__table">
      <thead>
        <tr>
          <th v-for="(column, i) in columns" :key="i">{{ column.name }}</th>
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
  </div>
</template>

<script>
import NextDatatableWrapper from '../utils/NextDatatableWrapper'
import props from '../api/NextDatatableProps'
import useRegisterLifeCycleComponent from '../api/useRegisterLifeCycleComponent'

export default {
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
