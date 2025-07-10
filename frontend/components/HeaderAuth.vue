<template>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, setLocale } = useI18n()
setLocale('vn')
// if (!locale.value) {
//   setLocale('vn')
// }
</script>
