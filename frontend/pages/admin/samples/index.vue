<template>
  <div class="row mt-2">
    <div class="col-12">
      <h2>{{ $t('Sample list') }}</h2>
    </div>
  </div>
  <hr>

  <div class="row mt-2">
    <div class="col-12 mb-2 d-flex gap-8 justify-content-end">
      <NuxtLinkLocale
          to="/admin/samples/create"
          class="btn btn-primary"
      >
        <i class="fas fa-plus" />
        {{ $t('Create') }}
      </NuxtLinkLocale>
    </div>
    <div class="col-xl-12">
      <div class="div-table-custom">
        <table>
          <thead>
            <tr>
              <th
                class="text-center"
                style="width: 60px;"
              >
                {{ $t('STT') }}
              </th>
              <th
                class="text-center"
                style="width: 100px;"
              />
              <th
                class="text-center"
                style="width: 250px;"
              >
                {{ $t('Title') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in dataList.data"
              :key="index"
            >
              <td class="text-center">
                {{ (pageIndex - 1) * size + index + 1 }}
              </td>
              <td class="text-center">
                <div class="d-flex gap-2">
                  <NuxtLinkLocale
                    :to="`/admin/samples/edit/${item.id}`"
                    class="btn btn-none btn-outline-warning btn-sm waves-effect waves-themed"
                    :title="$t('Edit')"
                  >
                    <i class="fal fa-edit" />
                  </NuxtLinkLocale>
                  <button
                    type="button"
                    class="btn btn-none btn-outline-danger btn-sm waves-effect waves-themed"
                    :title="$t('Delete')"
                    @click="confirmDelete(item.id)"
                  >
                    <i class="fal fa-trash" />
                  </button>
                </div>
              </td>
              <td class="text-left">
                {{ item.title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        v-if="dataList?.data?.length > 0"
        :current-page="pageIndex"
        :on-page-change="onPageChange"
        :total-pages="dataList.total_page"
        :number-item="dataList.number_item"
        :total-item="dataList.total_item"
        :size="size"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ComputedRef } from 'vue'
import {
  getListSamples,
  deleteSample,
} from '~/services/samples'

useHead({
  title: 'Admin - Samples',
})

definePageMeta({
  layout: 'admin',
  ssr: false,
})

const { t } = useI18n()
const { $toast, $swal } = useNuxtApp()

const { pageIndex, onPageChange, size } = usePaginationHook()
const { sort, direction, handleSort } = useSort()

const dataList = ref({})

const queryParams: ComputedRef<unknown> = computed(() => {
  return {
    size: 10,
    page: pageIndex.value,
    ...(sort.value && {
      sort: sort.value,
      order: direction.value || 'DESC',
    }),
  }
})

const reloadList = async () => {
  const { data, error: errorData } = await getListSamples(queryParams.value)

  if (data?.value) {
    dataList.value = data.value
  }
}

onNuxtReady(() => {
  reloadList()
})

watch(queryParams, async (value) => {
  await reloadList()
})

const confirmDelete = (sampleId) => {
  $swal.fire(
    {
      title: t('Confirm Delete'),
      text: t('Are you sure you want to delete?'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: t('Yes'),
      cancelButtonText: t('Cancel'),
    }).then((result) => {
    if (result.value) {
      if (sampleId) {
        deleteSample(sampleId).then(async (res) => {
          if (res?.data?.value?.status) {
            $toast.success(t('Deleted successfully.'))
            await reloadList()
          }
          else {
            $toast.error(t('Delete failed.'))
          }
        })
      }
      else {
      }
    }
  })
}
</script>

<style scoped>
</style>
