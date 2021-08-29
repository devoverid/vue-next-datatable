---
lang: en-US
title: Options API
description: Vue Next Datatable options.
---

# Options 

These are options object that you can pass when using the library. 
```js
const options = { 
    debug: true,
    // ... your another options goes here
}
app.use(NextDatatable, options)
```

You can use options in a specific component as well. This will override the default options that you installed via `app.use()`

```vue
<template>
  <NextDatatable :options="{ debug: true }">
</template>
```
