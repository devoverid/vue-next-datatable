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
  },
  plugins: [],
  themes: [],
}
