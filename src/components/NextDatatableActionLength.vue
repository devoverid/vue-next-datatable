<template>
  <div class="next-datatable__length">
    <select v-model="pagination.perPage">
      <option
        v-for="number in pagination.showEntriesBy"
        :key="number"
        :value="number"
      >
        {{ number }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
}
</script>
