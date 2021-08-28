<template>
    <div class="next-datatable__info">
      Showing {{ pagination.firstItemIndex }}
      to {{ pagination.lastItemIndex }} 
      of {{ pagination.totalRow }} entries
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
  setup() {
      return {}
  }
}
</script>
