---
lang: en-US
title: Customizing
description: This page describes how to customize vue-next-datatable.
---

# Customizing

## Add a theme
You can add your own theme to override the default theme. Add your theme object in the options. For example:

```js
import NextDatatable from 'vue-next-datatable'

const app = createApp(App)

const options = { 
    themes: [
        {
            name: 'minimalist',
            styles: {
                '--theme-primary': 'rgb(58, 166, 117)',
                '--text-color': '#333',
            },
        },
    ],   
}
app.use(NextDatatable, options)
```

## Using a theme
After your theme is registered, you can use the theme in two ways. 

Adding a theme as a default theme (applies to every Next Datatable):
```js
const options = {
    defaults: {
        theme: "minimalist" // pass the theme's name
    }
    themes: [
        {
            name: 'minimalist',
            styles: {
                '--theme-primary': 'rgb(58, 166, 117)',
                '--text-color': '#333',
            },
        },
    ]
}
```

## Default styles
```css
# Main Theme Colors
--theme-primary:     #1687A7;

--text-color:        #333;
--text-color-light:  rgb(221, 221, 221);

# Border
--border-color:      #dddee0;
--border-type:       solid;
--border-width:      1px;

# Sizes
--table-sm-cellpadding:  .25rem;
--table-md-cellpadding:  .5rem .5rem;
--table-lg-cellpadding:  1rem;

# Pagination
--pagination-button-color:              var(--text-color);
--pagination-button-color-active:       #f5f5f5;
--pagination-button-color-disabled:     rgb(116, 116, 116);
--pagination-button-background:         #f5f5f5;
--pagination-button-background-active:  var( --theme-primary);
--pagination-button-background-hover:   #ebebeb;
```