<template>
  <i
    class="fal fa-info-circle text-secondary"
    data-toggle="tooltip"
    data-placement="bottom"
    data-html="true"
    :title="`<div class='text-left'>${content}</div>`"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

onMounted(() => {
  if (typeof window !== 'undefined' && typeof window.$ !== 'undefined') {
    setTimeout(() => {
      if (typeof window.$().tooltip === 'function' && $('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip()
      }
      else {
        console.log('OOPS! bs.tooltip is not loaded')
      }
    }, 200)
  }
})
</script>
