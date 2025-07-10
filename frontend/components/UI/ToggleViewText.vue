<template>
  <span class="span-view-text">
    {{ displayText }}
    <i
      v-show="!showFullText"
      class="fal fa-eye icon-toggle icon-show-text"
      @click="toggleTextVisibility"
    />
    <i
      v-show="showFullText"
      class="fal fa-eye-slash icon-toggle icon-hide-text"
      @click="toggleTextVisibility"
    />
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  textValue: {
    type: String,
    default: '',
  },
})

const showFullText = ref(false)

const displayText = computed(() => {
  if (showFullText.value) {
    return props.textValue
  }
  else {
    const truncatedText = props.textValue.slice(0, 3)
    const hiddenCharacters = '*'.repeat(Math.max(props.textValue.length - 3, 0))
    return truncatedText + hiddenCharacters
  }
})

const toggleTextVisibility = (event) => {
  event.stopPropagation()
  showFullText.value = !showFullText.value
}
</script>

<style scoped>
.span-view-text {
  display: flex;
  gap: 4px;
  align-items: center;
}

.span-view-text .icon-toggle {
  cursor: pointer;
}
</style>
