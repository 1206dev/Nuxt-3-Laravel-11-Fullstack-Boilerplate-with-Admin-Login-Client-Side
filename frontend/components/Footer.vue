<template>
  <footer
    class="page-footer text-center d-block"
    align="center"
    role="contentinfo"
  >
    <div
      v-if="listCategory?.length > 0"
      class="row category-container"
    >
      <div
        v-for="item in listCategory"
        :key="item.id"
        class="col-md-3 col-6 category-item text-left"
      >
        <NuxtLinkLocale
          :to="`/category/${locale === 'en' ? item.slug : item.slug_vi}`"
          class="category-title"
        >
          {{ item.text }}
        </NuxtLinkLocale>
      </div>
    </div>

    <div class="row footer-wrapper">
      <div class="col-12 footer-content">
        <div class="footer-left">
        </div>
        <div class="footer-right">
          <span class="fw-700">@{{ formatDateToString(new Date(), 'yyyy') }} copyright</span>
        </div>
      </div>
    </div>

    <div class="mb-2 p-2" />
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const listCategory = ref([])
</script>

<style scoped>
  .page-footer {
    background: linear-gradient(145deg, #ffffff, #e6ecf3);
    padding: 12px 4px 4px 4px;
    font-family: 'Arial', sans-serif;
    color: #2c2c2c;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
  }

  .category-container {
    justify-content: center;
  }

  .category-item {
    margin-bottom: 15px;
  }

  .footer-wrapper {
    padding: 12px 4px;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .footer-left,
  .footer-right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .footer-left {
    gap: 15px;
  }

  .footer-right .fw-700 {
    font-weight: 700;
    font-size: 14px;
    color: #4a4a4a;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: 10px;
    }

    .footer-left,
    .footer-right {
      justify-content: center;
    }

    .footer-left {
      gap: 10px;
      flex-direction: column;
    }

    .category-item {
      text-align: center !important;
    }
  }

  .category-item .category-title {
    font-weight: 500;
    font-size: 16px;
    background: linear-gradient(90deg, #7b61ff, #40c9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .category-item .category-title:hover {
    background: linear-gradient(90deg, #6847f7, #30b7ef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateY(-3px);
  }

  .footer-left .category-title {
    font-weight: 500;
    font-size: 15px;
    background: linear-gradient(90deg, #7b61ff, #40c9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  .footer-left .category-title:hover {
    background: linear-gradient(90deg, #6847f7, #30b7ef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateY(-3px);
  }
</style>
