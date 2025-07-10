<template>
  <div
    v-if="headings.length > 0"
    class="toc"
  >
    <ul>
      <li
        v-for="heading in headings"
        :key="heading.id"
        :class="'level-' + heading.level"
      >
        <a :href="'#' + heading.id">{{ heading.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const headings = ref([])

const generateTOC = () => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.content, 'text/html')
  const hTags = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

  headings.value = Array.from(hTags).map((heading, index) => {
    return {
      id: heading.id || `heading-${index}`,
      text: heading.textContent,
      level: Number.parseInt(heading.tagName.replace('H', ''), 10),
    }
  })
}

onMounted(async () => {
  watch(() => props.content, generateTOC, { immediate: true })
})
</script>

<style scoped>
  .toc {
    border-radius: 10px;
    padding: 8px;
    background: linear-gradient(145deg, #f5f5f7, #ffffff);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    font-family: inherit;
  }

  .toc ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }

  .toc li {
    margin: 6px 0;
    font-size: 15px;
    line-height: 1.5;
    font-weight: 500;
    color: #333;
    transition: all 0.2s ease;
    border-radius: 6px;
  }

  .toc li:hover {
    background: linear-gradient(90deg, #eef4ff, #e2ecff);
    transform: translateX(4px);
  }

  .toc li.level-1 {
    padding-left: 4px;
  }

  .toc li.level-2 {
    padding-left: 12px;
  }

  .toc li.level-3 {
    padding-left: 20px;
  }

  .toc li.level-4 {
    padding-left: 28px;
  }

  .toc li.level-5 {
    padding-left: 36px;
  }

  .toc li.level-6 {
    padding-left: 44px;
  }

  .toc a {
    display: block;
    padding: 6px 8px;
    color: #1a1a1a;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .toc a:hover {
    color: #1a5eff;
    text-decoration: none;
  }
</style>
