<template>
    <div class="next-datatable">
        <div class="next-datatable__action">
            <div class="next-datatable__length">
                <select v-model="options.perPage" @change="events.onChangeEntries">
                    <!-- <option v-for="number in options.showEntriesBy" :key="number" value="number">{{ number }}</option>                         -->
                </select>
            </div>
            <div class="next-datatable__filter">
                <label>
                    Search:
                    <input 
                        type="text" 
                        placeholder="Search" 
                        v-model="search"
                        @keypress="onFilter"
                    >
                </label>
            </div>
        </div>
        <table class="next-datatable__table">
            <thead>
                <tr>
                    <th v-for="(column, i) in columns" :key="i">{{ column.name }}</th> <!-- Id -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in rows" :key="i">
                    <td v-for="(column, j) in columns" :key="j">
                        <slot
                            :name="`row-${column.name}`"
                            :rowData="row"
                            :column="column"
                        >
                            {{ row[column.name] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
    </div>
</template>
<script>
import { ref, defineComponent,  onMounted, computed, inject, reactive } from 'vue'
import events from "../utils/events"

import FlexSearch from "flexsearch"


export default defineComponent({
    inject: ["$nextDatatable"],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array ,
            default: () => [
                {
                    name: 'id',
                    searchable: false,
                }
            ]
        },
        filters: {
            type: Object,
            default: () => {}
        },
        search: {
            type: String,
        },
        options: {
            type: Object,
            default: () => {
                return {
                    paginate: true,
                    searching: true,
                    perPage: 10,
                    showEntriesBy: [10, 20, 50, 100]
                }
            }
        }
    },
    setup(props, context) {
        let search = ref('')
        const $nextDatatable = inject('$nextDatatable')
        const defaultOptions = reactive({
            paginate: true,
            searching: true,
            perPage: 10,
            showEntriesBy: [10, 20, 50, 100]
        })
        const options = Object.assign(defaultOptions, $nextDatatable.defaults, props.options)

        let filteredData = reactive(props.data)
        const searchableColumns = computed(() => props.columns.filter(column => column.searchable !== false))
        const isServerSide = false

        const rows = computed(() => {
            // const data = props.data
            return filteredData
        })
        console.log(searchableColumns)

        console.log(searchableColumns.value)
        // Init FlexSearch
        const index = new FlexSearch.Document({
            id: "id",            
            index: searchableColumns.value.map(s => s.name)
        });



        onMounted(() => {
            // Add data to FlexSearch document
            props.data.forEach((data,i) => index.add(i,data))
        })
        
        
        const onFilter = (event) => {
            // If not server side, we need to filter the data
            if (!isServerSide) {
                filteredData = index.search(search.value, searchableColumns.value.map(s => s.name))
                console.log(filteredData, search.value)
            }
        }

        const refresh = () => {
        }

        return {
            search,
            events,
            searchableColumns,
            onFilter,

            rows,
            refresh,
        }
    }
})
</script>