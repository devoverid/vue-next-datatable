export default {
  debug: true,
  defaults: {
    perPage: 10,
    showEntriesBy: [10, 20, 50, 100],
    sort: {
      mode: 'single',
      order: [],
    },
    type: 'bordered',
    size: 'md',
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
