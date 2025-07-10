<template>
  <label
    class="switch mb-0"
    :for="checkboxId"
    :class="checked && 'label-checked'"
  >
    <div class="slider round" />
  </label>
  <input
    :id="checkboxId"
    v-model="checked"
    hidden
    type="checkbox"
    @click="toggleCheckbox"
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
})

const generateRandomId = () => {
  return 'sw-checkbox-' + Math.random().toString(36).substr(2, 9)
}

const checkboxId = computed(() => props.id || generateRandomId())

const emit = defineEmits()

const checked = ref(props.value)

const toggleCheckbox = () => {
  checked.value = !checked.value
  emit('input', checked.value)
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider,
.label-checked .slider {
  background-color: #444e6a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #444e6a;
}

input:checked + .slider:before,
.label-checked .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
