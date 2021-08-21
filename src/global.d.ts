// Global compile-time constants
declare var __DEV__: boolean
declare var __BROWSER__: boolean
declare var __CI__: boolean

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
