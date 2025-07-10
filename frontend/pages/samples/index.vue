<template>
  <div class="row">
    <div class="col-12">
      <BreadCrumb :list-url-info="listUrlInfo" />
    </div>
  </div>

  <div
    v-if="listSample?.data?.length > 0"
    class="row mt-2 mb-1"
  >
    <template
      v-for="(itemSample, indexSample) in listSample.data"
      :key="indexSample"
    >
      <div class="col-12">
         {{ itemSample.title }}
      </div>
    </template>
  </div>

  <div
    class="row mt-3"
  >
    <div
      v-if="listSample?.data?.length > 0 && pageIndex > 1"
      class="text-center"
      :class="listSample?.data?.length > 0 && pageIndex < listSample.total_page ? 'col-6' : 'col-12'"
    >
      <button
        class="btn btn-outline-secondary"
        @click="loadPrevSample()"
      >
        <i class="fas fa-chevron-left mr-2" />
        {{ $t('See previous') }}
      </button>
    </div>
    <div
      v-if="listSample?.data?.length > 0 && pageIndex < listSample.total_page"
      class="text-center"
      :class="listSample?.data?.length > 0 && pageIndex > 1 ? 'col-6' : 'col-12'"
    >
      <button
        class="btn btn-outline-secondary"
        @click="loadMoreSample()"
      >
        {{ $t('See more') }}
        <i class="fas fa-chevron-right ml-2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ComputedRef } from 'vue'
import { useApiDataServer } from '~/composables/useApiDataServer'

const { t, locale } = useI18n()
const config = useRuntimeConfig()
const router = useRouter()

const route = useRoute()
const { pageIndex, onPageChange, size } = usePaginationHook()
const { sort, direction, handleSort } = useSort()

const routePage = computed(() => {
  return Number(router.currentRoute.value.query.page) || 1
})

const listUrlInfo = computed(() => [
  {
    path: '/',
    name_en: 'Home',
    name_vi: 'Trang chủ',
  },
  {
    path: '',
    name_en: 'Latest Samples',
    name_vi: 'Sample mới nhất',
  },
])

const setHeadPage = () => {
  useHead({
    title: '',
    meta: [
      { name: 'description', content: ''},
      { name: 'keywords', content: ''},
      { name: 'author', content: config.public.appName },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: '',},
      { property: 'og:description', content: '',},
      { property: 'og:image', content: '' },
      { property: 'og:url', content: '' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: '' },
      { name: 'twitter:title', content: '',},
      { name: 'twitter:description', content: '',},
      { name: 'twitter:image', content: '' },
    ],
    link: [
      {
        rel: 'canonical',
        href: config.public.apiUrl + getLocalePath('/samples', 'vn'),
      },
      {
        rel: 'alternate',
        hreflang: 'vi',
        href: config.public.apiUrl + getLocalePath('/samples', 'vn'),
      },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: config.public.apiUrl + getLocalePath('/samples', 'en'),
      },
    ],
  })
}

watch(routePage, (newPage) => {
  pageIndex.value = newPage
}, { immediate: true })

const listSample = ref([])

const queryParams: ComputedRef<unknown> = computed(() => {
  return {
    size: size.value,
    page: pageIndex.value,
    ...(sort.value && {
      sort: sort.value,
      order: direction.value || 'DESC',
    }),
  }
})

const reloadList = async () => {
  const { data: dataListSample } = await useApiDataServer(`listSamples${JSON.stringify(queryParams.value)}`, '/api/samples', {
    params: queryParams.value,
  })

  if (dataListSample?.value) {
    listSample.value = dataListSample.value
  }

  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  setHeadPage()
}

reloadList()

watch(queryParams, async (value) => {
  await reloadList()
})

const loadMoreSample = async () => {
  listSample.value = []
  pageIndex.value = pageIndex.value + 1
  router.push({
    path: route.path,
    query: { ...route.query, page: pageIndex.value },
  })
}

const loadPrevSample = async () => {
  listSample.value = []
  pageIndex.value = pageIndex.value - 1
  router.push({
    path: route.path,
    query: { ...route.query, page: pageIndex.value },
  })
}
</script>

<style scoped>

</style>
