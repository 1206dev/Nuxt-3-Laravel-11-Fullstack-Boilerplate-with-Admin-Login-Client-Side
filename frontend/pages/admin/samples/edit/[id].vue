<template>
  <div class="row mt-2">
    <div class="col-12">
      <h2>{{ $t('Edit sample') }}</h2>
    </div>
  </div>
  <hr>

  <div class="row mt-2">
    <div class="col-12">
      <ClientOnly>
        <VForm
          v-if="isObjectNotEmpty(dataForm)"
          v-slot="{ handleSubmit, errors }"
          :initial-values="dataForm"
          :validation-schema="schema"
          :on-invalid-submit="onInvalidSubmit"
          as="div"
        >
          <form
            class="vee-validated"
            :initial-values="dataForm"
            @submit="handleSubmit($event, onSubmit as SubmissionHandler)"
          >
            <div class="div-form">
              <div class="row">
                <div class="col-6 form-group">
                  <label
                    class="form-label"
                  >{{ $t('Title') }} <span class="required">(*)</span></label>
                  <div
                    class="div-text-box"
                    :class="errors.title && 'vee-is-invalid'"
                  >
                    <VField
                      name="title"
                      type="text"
                      class="form-control"
                      :class="errors.title && 'vee-is-invalid'"
                      maxlength="255"
                    />
                  </div>
                  <VErrorMessage
                    name="title"
                    class="invalid-feedback"
                  />
                </div>
              </div>

              <div class="row mt-2 p-2">
                <div class="col-12 d-flex space-between mb-2">
                  <NuxtLinkLocale
                    to="/admin/samples"
                    class="btn btn-info"
                  >
                    <i class="fas fa-arrow-left" />
                    {{ $t('Back') }}
                  </NuxtLinkLocale>
                  <button
                    class="btn btn-primary"
                    :disabled="pendingSubmitForm"
                  >
                    <i class="fas fa-plus" />
                    {{ $t('Save') }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </VForm>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'
import { currentLangState } from '~/store'
import {
  getSample,
  updateSample,
} from '~/services/samples'
import { useFormHook } from '~/composables/useFormHook'

useHead({
  title: 'Admin - Edit sample',
})

definePageMeta({
  layout: 'admin',
  ssr: false,
})

const { t, locale } = useI18n()
const { $toast } = useNuxtApp()

const schema = yup.object({
  title: yup.string().trim().required(t('This field is required.')),
})

const { onInvalidSubmit } = useFormHook()
const pendingSubmitForm = ref(false)

const currentLangCode = ref('')

const route = useRoute()

const id = computed(() => {
  return route.params.id as string
})

const dataForm = ref({})

onNuxtReady(async () => {
  const currentLang = currentLangState()
  currentLangCode.value = currentLang.get?.value

  const { data: sampleDetail } = await getSample(id.value)

  if (sampleDetail.value) {
    dataForm.value = {
      title: sampleDetail.value.title,
    }
  }

  await nextTick()
})

const onSubmit = async (values) => {
  pendingSubmitForm.value = true
  const dataSample = {
    title: values.title,
  }

  const { data: res, error: errorSubmit } = await updateSample(id.value, dataSample)

  if (res?.value?.id) {
    $toast.success(t('Successfully.'))
    navigateTo(getLocalePath('/admin/samples', currentLangCode.value))
  }
  else {
    $toast.error(t('Failed.'))
  }
  pendingSubmitForm.value = false
}
</script>

<style scoped>

</style>
