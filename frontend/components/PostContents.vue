<template>
  <div
    class="col-12 div-post-content"
    v-html="contentCovert"
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const contentCovert = ref('')

const coverPostContent = () => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.content, 'text/html')
  const hTags = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

  hTags.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`
    }
  })

  contentCovert.value = doc.body.innerHTML
}

onMounted(async () => {
  watch(() => props.content, coverPostContent, { immediate: true })
})
</script>

<style>
    .div-post-content {
        word-wrap: break-word;
        font-size: 18px;
    }
    .div-post-content img {
        max-width: 100%;
    }
</style>
