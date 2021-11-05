<template>
  <div class="next-datatable__filter">
    <label for="next-datatable__input" class="sr-only">Search :</label>
    <input
      id="next-datatable__input"
      type="text"
      placeholder="Search"
      v-model="search"
    />
  </div>
</template>

<script>
import { watch } from 'vue'
export default {
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    watch(() => props.search, val => {
      emit('update:search', val)
    })
  }
}
</script>

