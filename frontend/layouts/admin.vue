<template>
  <div
    id="body_root"
    class="desktop chrome webkit pace-done mod-bg-1 mod-nav-link header-function-fixed nav-function-fixed nav-function-top"
  >
    <div class="div-page">
      <div class="div-body d-flex">
        <AdminNavBar :items="menuItems" />
        <div class="div-body-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

definePageMeta({
  ssr: false,
})

const { t } = useI18n()

const menuItems = [
  { icon: 'fas fa-chart-line', path: '/admin', name: t('Dashboard') },
  { icon: 'fas fa-file-alt', path: '/admin/samples', name: t('Samples List') },
]

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
.div-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.div-body {
  height: calc(100vh - 60px);
  padding: 8px;
}
.div-body-content {
  width: 100%;
  padding: 8px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
