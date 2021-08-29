---
lang: en-US
title: defaults
description: Vue Next Datatable options.
---

# `defaults`
Defaults options that applies to every `<NextDatatable/>` usage.

## `perPage`
- **Type:** `Number`
- **Default:** `10` 
- **Details:** 
    Number of items to show per page.
- **Usage:**
```js
app.use(NextDatatable, {
    defaults: {
        perPage: 10
    }
})
```

## `showEntriesBy`
- **Type:** `Array<number>`
- **Default:** `[10, 20, 50, 100]` 
- **Details:** 
    Number of items to show that can be selected.
- **Usage:**
```js
app.use(NextDatatable, {
    defaults: {
        showEntriesBy: [5, 10, 20]
    }
})
```

## `type`
- **Type:** `String`
- **Default:** `bordered` 
- **Details:** 
    Table style type. 
- **Available values:**  `bordered`, `striped`, `borderless`
- **Usage:**
```js
app.use(NextDatatable, {
    defaults: {
        type: 'bordered'
    }
})
```

## `size`
- **Type:** `String`
- **Default:** `md` 
- **Details:** 
    Table size.
- **Available values:**  `sm`, `md`, `lg`
- **Usage:**
```js
app.use(NextDatatable, {
    defaults: {
        size: 'md'
    }
})
```

## `pagination`
- **Type:** `Object`
- **Default:** 
```js
{
    position: 'end',
    type: 'separate',
    activeColor: '#185ABD'
}
```
- **Usage:**
```js
app.use(NextDatatable, {
    defaults: {
        pagination: {
            position: 'end',
            type: 'separate',
            activeColor: '#185ABD'
        }
    }
})
```
See more references below.

### `pagination.position`
- **Type:** `String`
- **Default:** `end`
- **Available values:** `start`, `center`, `end`
- **Details:** The pagination align position.

### `pagination.type`
- **Type:** `String`
- **Default:** `separate`
- **Available values:** `start`, `center`, `end`
- **Details:** The pagination align position.


### `pagination.activeColor`
- **Type:** `String`
- **Default:** `#185ADB`
- **Details:** The pagination active color. This color is to highlight the page number where user at.


