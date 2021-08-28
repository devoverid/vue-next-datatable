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
            v-if="itemState(pagination, i) === true"
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
            v-if="itemState(pagination, i) === 'dot'"
            class="next-datatable__pagination__item next-datatable__pagination__item__dot"
          >
          <button :disabled="true">...</button>
        </li>
        <li
            v-if="itemState(pagination, i) === 'a'"
            class="next-datatable__pagination__item next-datatable__pagination__item__dot"
          >
          <button :disabled="true">{{ i }} - {{ pagination.currentPage }}</button>
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
import { computed, ref } from 'vue'
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
  setup(props) {
    const { pagination } = props
    const compactItemDiff = ref(2)
    const maxItemToShow = ref(7)
    const totalPage = computed(() => pagination.totalPage)
    const currentPage = computed(() => pagination.currentPage)

    const itemState = (pagination, i) => {
      // show all if total page is less than max item to show
      if (totalPage.value <= maxItemToShow.value ) return true

      // show first page and last page
      if (i === 1 || i === totalPage.value) return true

      // show compact pagination
      if (
        (totalPage.value > maxItemToShow.value)
        && (currentPage.value > (maxItemToShow.value-4) 
        && currentPage.value <= totalPage.value - (maxItemToShow.value-4))
      ) {
        // if (i == currentPage.value - compactItemDiff.value) return 'dot'
        if (i > currentPage.value - (compactItemDiff.value+2) && i < currentPage.value + (compactItemDiff.value+1)) {
          if (i == (currentPage.value - compactItemDiff.value) || i == (currentPage.value + compactItemDiff.value)) {
            return 'dot'
          }
          if (
            (i == currentPage.value) ||
            (i == (currentPage.value - 1)) ||
            (i == (currentPage.value + 1))
          ) {
            return true
          }
        }
      } else {
        if (currentPage.value < maxItemToShow.value-1) {
          if ((i > 1 && i < (maxItemToShow.value-1))) {
            return true
          } else if (i == maxItemToShow.value-1) {
            return 'dot';
          }
        } else if (currentPage.value > totalPage.value - maxItemToShow.value) {
          if ((i > (totalPage.value - (maxItemToShow.value-2)) && i < (totalPage.value))) {
            return true
          } else if (i == totalPage.value-(maxItemToShow.value-1)) {
            return 'dot'
          }
        }
      }

      // hide item
      return false
    }

    return {
      itemState,
      maxItemToShow,
    }
  }
}
</script>

