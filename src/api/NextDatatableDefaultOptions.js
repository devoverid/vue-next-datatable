export default {
  debug: true,
  defaults: {
    server: {
      url: '',
    },
    perPage: 10,
    showEntriesBy: [10, 20, 50, 100],
    type: 'bordered',
    size: 'md',
    sort: {
      mode: 'single',
      order: [],
    },
    pagination: {
      position: 'end',
      type: 'extended',
      activeColor: '#185ADB',
    },
    search: {
      mode: 'forward', // flexsearch tokenizer. Please refer to https://github.com/nextapps-de/flexsearch#tokenizer-prefix-search
    },
  },
  plugins: [],
  themes: [],
}
