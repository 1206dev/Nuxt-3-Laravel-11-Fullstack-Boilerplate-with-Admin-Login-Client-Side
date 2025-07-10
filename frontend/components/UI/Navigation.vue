<template>
  <ul
    class="nav nav-tabs"
    role="tablist"
  >
    <li
      v-for="(item, key) in tabs"
      :key="item.key"
      class="nav-item"
    >
      <span
        class="nav-link cursor-pointer"
        :class="tab === item.key && 'active'"
        role="tab"
        @click="tab = item.key"
      >{{ item.title }}</span>
    </li>
  </ul>
  <div class="tab-content border border-top-0 p-3">
    <template
      v-for="(item) in tabs"
      :key="`body-${item.key}`"
    >
      <div
        v-show="tab === item.key"
        class="fade show active"
        role="tabpanel"
      >
        <component
          :is="item.component"
          :props="item.props"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import type { Tab } from '~/types'

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true,
  },
})
const tab: Ref<string> = ref('')
onMounted(() => {
  tab.value = props.tabs[0]?.key
})
</script>

<style scoped>
.nav-link.active {
  background-color: #d9dbe1;
  border-bottom-color: #d9dbe1;
}
</style>
