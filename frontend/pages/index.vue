<template>
  <div class="row mt-3">
    <div class="col-12">
      <div class="div-header-box">
        {{ $t('Latest samples') }}
      </div>
    </div>
  </div>

  <div
    v-if="listLastSample?.data?.length > 0"
    class="row mt-3"
  >
    <div class="col-md-12">
      <template
        v-for="(itemLastSample, indexLastSample) in listLastSample.data.slice(1)"
        :key="indexLastSample"
      >
        <div>
          {{ itemLastSample.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useApiDataServer } from '~/composables/useApiDataServer'

const { t, locale } = useI18n()
const config = useRuntimeConfig()

const setHeadPage = () => {
  useSeoMeta({
    title: '',
    description: '',
    keywords: '',
    robots: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: '',
    twitterCard: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
  })

  useHead({
    link: [
      {
        rel: 'canonical',
        href: config.public.apiUrl + getLocalePath('', 'vn'),
      },
      {
        rel: 'alternate',
        hreflang: 'vi',
        href: config.public.apiUrl + getLocalePath('', 'vn'),
      },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: config.public.apiUrl + getLocalePath('', 'en'),
      },
    ],
  })
}

setHeadPage()

const { data: listLastSample } = await useApiDataServer('listLastSample', '/api/samples', {
  params: {
    size: 10,
    page: 1,
    sort: 'id',
    order: 'DESC',
  },
})
</script>

<style scoped>
</style>
