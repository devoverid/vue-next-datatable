export interface INextDatatableOptions {
  defaults?: ITableOptions
}

export interface ITableColumn {
  name: string
  label: string
  searchable?: boolean
  sortable?: boolean
  filter?: boolean
}

export interface ITableOptions {
  paginate?: boolean
  searching?: boolean
  perPage?: 10
  showEntriesBy?: Array<number>
  ajax?: ITableOptionsAjax
  url?: string
}

// Coming soon: integrate with vue-auth, auto ngirim headers authorization
export interface ITableOptionsAjax {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: { [key: string]: string }
}
