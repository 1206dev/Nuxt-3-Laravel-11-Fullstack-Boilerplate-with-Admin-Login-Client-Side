<template>
  <nav>
    <ul class="breadcrumb-custom">
      <li
        v-for="(item, index) in listUrlInfo"
        :key="index"
        :title="locale === 'en' ? item.name_en : item.name_vi"
      >
        <NuxtLinkLocale
          v-if="item.path"
          :to="item.path"
        >
          {{ locale === 'en' ? item.name_en : item.name_vi }}
        </NuxtLinkLocale>
        <span v-else>
          {{ locale === 'en' ? item.name_en : item.name_vi }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps({
  listUrlInfo: {
    type: Array,
    default: () => [
      {
        path: '/',
        name_en: 'Home',
        name_vi: 'Trang chủ',
      },
    ],
  },
})
const { locale } = useI18n()
const config = useRuntimeConfig()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          ...(props.listUrlInfo).map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
              '@type': 'WebPage',
              '@id': config.public.apiUrl + item.path,
              'name': locale.value === 'en' ? item.name_en : item.name_vi,
            },
          })),
        ],
      }),
    },
  ],
})
</script>

<style scoped>
.breadcrumb-custom {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  list-style: none;
  background-color: #f6f6f6;
  border-radius: 4px;
  gap: 8px;
}

.breadcrumb-custom li {
  display: flex;
  align-items: center;
}

.breadcrumb-custom li a,
.breadcrumb-custom li span {
  text-decoration: none;
  font-weight: bold;
  text-transform: capitalize;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}

.breadcrumb-custom li a {
  color: #0056b3;
}

.breadcrumb-custom li:not(:first-child)::before {
  content: "›";
  color: #555;
  margin-right: 8px;
}
</style>
