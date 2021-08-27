<template>
  <div :class="{
    'next-datatable__pagination': true,
    [`next-datatable__pagination--${options.position}`]: true,
    [`next-datatable__pagination--${options.type}`]: true,
    }">
    <ul class="next-datatable__pagination__nav">
      <li class="next-datatable__pagination__item next-datatable__pagination__item__prev">
        <button
          :disabled="pagination.currentPage <= 1"
          @click.prevent="pagination.navigate(pagination.currentPage - 1)"
        >
          Prev
        </button>
      </li>
      <template v-for="i in pagination.totalPage" :key="i">
        <li
          v-if="pagination.totalPage > 5 && (i > 1)  && (i < pagination.currentPage - compactOffsetDiff && i > pagination.currentPage - (compactOffsetDot+compactOffsetDiff+1))"
          class="next-datatable__pagination__item datatable__pagination__item__dot"
        >
          <button :disabled="true">...</button>
        </li>
        <li
            v-if="
              !(
                pagination.totalPage > 5 &&
                ((i < pagination.currentPage - (compactOffsetDot)) || (i > pagination.currentPage + (compactOffsetDot)))
              ) ||
              (pagination.totalPage > 5 
              && (
                (i === 1)
                || (i === pagination.totalPage))
                || (pagination.currentPage <= 5 && i <= 4)
                || (pagination.currentPage >= pagination.totalPage-4 && i >= pagination.totalPage - 2)
              )
            "
            class="next-datatable__pagination__item"
            :class="{
              'datatable__pagination__item--active': i === pagination.currentPage,
            }"
          >
          <button
            :disabled="pagination.currentPage === i" @click.prevent="pagination.navigate(i)">
            {{ i }}
          </button>
        </li>
        <li
          v-if="pagination.totalPage > 5 && (i < pagination.totalPage) && (i > pagination.currentPage + compactOffsetDiff && i < pagination.currentPage + (compactOffsetDot+compactOffsetDiff+1))"
          class="next-datatable__pagination__item datatable__pagination__item__dot"
        >
          <button :disabled="true">...</button>
        </li>
      </template>
      <li class="next-datatable__pagination__item next-datatable__pagination__item__next">
        <button
          :disabled="pagination.currentPage >= pagination.totalPage"
          @click.prevent="pagination.navigate(pagination.currentPage + 1)"
        >
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
    },
  },
  setup() {
    return {
      compactOffsetDiff: 2,
      compactOffsetDot: 1,
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../scss/components/next-datatable-pagination";
</style>

