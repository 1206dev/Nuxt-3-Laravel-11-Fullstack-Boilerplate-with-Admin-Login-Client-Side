<template>
  <div
    v-if="props.numberItem > 0"
    class="mt-3 float-left"
  >
    {{ $t('Showing {from}-{to} from {total}', [formatNumber((props.size * (props.currentPage - 1)) + (props.numberItem > 0 ? 1 : 0)), formatNumber((props.size * (props.currentPage - 1)) + props.numberItem), formatNumber(props.totalItem)]) }}
  </div>
  <ul
    v-if="props.numberItem > 0"
    class="pagination mt-3 float-right"
  >
    <li :class="` page-item ${currentPage <= 1 ? 'disabled' : 'cursor-pointer'}`">
      <a
        class="page-link"
        aria-label="Previous"
        @click="
          () => {
            currentPage > 1 ? onPageChange(1) : undefined;
          }
        "
      >
        <span aria-hidden="true"><i class="fal fa-chevron-left" /><i class="fal fa-chevron-left" /></span>
      </a>
    </li>
    <li :class="` page-item ${currentPage <= 1 ? 'disabled' : 'cursor-pointer'}`">
      <a
        class="page-link"
        aria-label="Previous"
        @click="
          () => {
            currentPage > 1 ? onPageChange(currentPage - 1) : undefined;
          }
        "
      >
        <span aria-hidden="true"><i class="fal fa-chevron-left" /></span>
      </a>
    </li>
    <li
      v-for="(page, index) in listPages"
      :key="index"
      :class="`page-item ${currentPage === page ? 'active' : 'cursor-pointer'}`"
      aria-current="page"
    >
      <span
        v-if="currentPage === page"
        class="page-link"
      >
        {{ formatNumber(page) }}
        <span class="sr-only">{current}</span>
      </span>
      <a
        v-else
        class="page-link"
        @click="onPageChange(page)"
      >{{ formatNumber(page) }}</a>
    </li>
    <li :class="`page-item ${currentPage >= totalPages ? 'disabled' : 'cursor-pointer'}`">
      <a
        class="page-link"
        aria-label="Next"
        @click="
          () => {
            currentPage < totalPages
              ? onPageChange(currentPage + 1)
              : undefined;
          }
        "
      >
        <span aria-hidden="true"><i class="fal fa-chevron-right" /></span>
      </a>
    </li>
    <li :class="`page-item ${currentPage >= totalPages ? 'disabled' : 'cursor-pointer'}`">
      <a
        class="page-link"
        aria-label="Next"
        @click="
          () => {
            currentPage < totalPages
              ? onPageChange(totalPages)
              : undefined;
          }
        "
      >
        <span aria-hidden="true"><i class="fal fa-chevron-right" /><i class="fal fa-chevron-right" /></span>
      </a>
    </li>
  </ul>
  <div
    v-if="props.numberItem === 0"
    class="pl-0 pt-2 pb-2 text-center"
  >
    {{ $t('Empty data.') }}
  </div>
</template>

<script setup lang="ts">
import { PAGE_SIZE_LIMIT } from '~/constants'

const props = defineProps({
  totalPages: {
    type: Number,
    default: 1,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  showNumberPages: {
    type: Number,
    default: 5,
  },
  numberItem: {
    type: Number,
    default: 0,
  },
  totalItem: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: PAGE_SIZE_LIMIT,
  },
  onPageChange: {
    type: Function,
    required: true,
  },
})

const startPage = ref(1)
const endPage = ref(1)
const listPages = computed(() => getPages())

const getPages = () => {
  const pages = []
  const start = props.currentPage - Math.floor(props.showNumberPages / 2)
  startPage.value = start > 1 ? start : 1
  const end = startPage.value + props.showNumberPages - 1
  if (end < props.totalPages) {
    endPage.value = end
  }
  else {
    endPage.value = props.totalPages
  }
  if (
    endPage.value - props.showNumberPages + 1 >= 1
    && endPage.value - props.showNumberPages + 1 < startPage.value
  ) {
    startPage.value = endPage.value - props.showNumberPages + 1
  }
  if (endPage.value - props.showNumberPages <= 1) {
    startPage.value = 1
  }
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }
  return pages
}
</script>
