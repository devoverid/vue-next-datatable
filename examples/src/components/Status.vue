<template>
  <div
    class="badge"
    :class="{
      'status-success': rowData.status === 'Success',
      'status-pending': rowData.status === 'Pending',
      'status-error': rowData.status === 'Failed',
    }"
  >
    {{ `${rowData.status}`.toUpperCase() }}
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.badge {
  color: white;
  display: inline-block;
  padding: .4em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
}
.status-error {
  background: red;
}
.status-pending {
  background: orange;
}
.status-success {
  background: green;
}
</style>
