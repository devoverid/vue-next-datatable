module.exports = {
  rootDir: './',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['**/src/**/*.{js,vue}'],
  testMatch: ['<rootDir>/test/**/*.spec.js'],
  transform: {
    '^.+\\.(js)?$': '@sucrase/jest-plugin',
    '.*\\.(vue)$': 'vue-next-jest',
    '^.+\\.scss$': 'jest-scss-transform',
  },
  moduleNameMapper: {
    '^vue-jest$': '<rootDir>/node_modules/vue-next-jest',
    vue: '<rootDir>/node_modules/vue',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  globals: {
    __DEV__: true,
    __BROWSER__: true,
    __TEST__: true,
  },
  testURL: 'http://localhost/',
}
