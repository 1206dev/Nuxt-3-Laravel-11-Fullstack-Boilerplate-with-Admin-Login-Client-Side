<template>
  <div
    id="body_root"
    :class="`desktop chrome webkit pace-done mod-bg-1 mod-nav-link header-function-fixed nav-function-fixed nav-function-top blur`"
  >
    <HeaderAuth />
    <slot />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  ssr: false,
})
useHead({
  bodyAttrs: {
    class:
        'desktop chrome webkit pace-done mod-bg-1 mod-nav-link header-function-fixed nav-function-fixed nav-function-top',
  },
})
onMounted(() => {
  setTimeout(() => {
    $(window).on('popstate', function () {
      $('.modal').modal('hide')
      $('.modal-backdrop').remove()
      $('.in').remove()

      $('.select2-container').remove()
    })
  }, 100)
})
</script>

<style scoped>
</style>
