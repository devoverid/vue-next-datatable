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
                        @keydown="onFilter"
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
<script lang="ts">
import { ref, defineComponent, PropType, onMounted, computed, onBeforeMount, inject, reactive } from 'vue'
import events from "../utils/events"
import {
    ITableOptions,
    ITableColumn,
    INextDatatableOptions,
} from '../utils/types'

export default defineComponent({
    inject: ["$nextDatatable"],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array as PropType<ITableColumn[]>,
            default: () => [
                {
                    name: 'id',
                    searchable: false,
                }
            ]
        },
        filters: {
            type: Object as PropType<{ [key: string]: (value: any) => string }>,
            default: () => {}
        },
        search: {
            type: String,
        },
        options: {
            type: Object as PropType<ITableOptions>,
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
        const $nextDatatable = inject('$nextDatatable') as INextDatatableOptions
        const defaultOptions: ITableOptions = reactive({
            paginate: true,
            searching: true,
            perPage: 10,
            showEntriesBy: [10, 20, 50, 100]
        })
        const options: ITableOptions = Object.assign(defaultOptions, $nextDatatable.defaults, props.options)

        let filteredData = reactive(props.data)
        // const searchableColumns = computed(() => props.columns.filter(column => column.searchable))
        // const isServerSide = computed(() => (typeof $nextDatatable.options.ajax !== 'undefined' && typeof $nextDatatable.options.url !== 'undefined'))

        // const rows = computed(() => {
        //     // const data = props.data
        //     return filteredData
        // })
        
        const onFilter = (event: any): void => {
            // const data = props.data
            
            // // If not server side, we need to filter the data
            // if (!isServerSide) {
            //     filteredData = data.filter(each: Object<{ [key: string]: (value: any) => string }>  => {
            //         let res = false
            //         for (let i = 0; i < searchableColumns.value.length; i++) {
            //             const column = searchableColumns.value[i];
            //             if(each[column].contains(search.value)) {
            //                 res = true
            //                 break
            //             }
            //         }
            //         // searchableColumns.value.forEach(column => {
            //         //     if(each[column].contains(search.value)) res = true
            //         // })
            //         return res
            //     })
            // }
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
<style>
    thead tr th {
        border: 1px solid black;
    }
</style>