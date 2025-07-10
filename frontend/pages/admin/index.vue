<template>
  <div class="row mt-2">
    <div class="col-12">
      <h2>{{ $t('Dashboard') }}</h2>
    </div>
  </div>
  <hr>

  <div class="row mt-2">
    <div class="col-xl-12">
      Web content
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Admin - Dashboard',
})

definePageMeta({
  layout: 'admin',
  ssr: false,
})
</script>

<style scoped>
</style>
