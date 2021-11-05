<template>
    <div class="next-datatable__info">
      Showing {{ pagination.firstItemIndex }}
      to {{ pagination.lastItemIndex }} 
      of {{ pagination.totalFilteredRow }} entries
      <template v-if="pagination.filterMode">
        (
        filtered
        from {{ pagination.totalRow }} 
        total entries
        )
      </template>
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
