<template>
  <div class="row mt-2">
    <div class="col-12">
      <h2>{{ $t('Create sample') }}</h2>
    </div>
  </div>
  <hr>

  <div class="row mt-2">
    <div class="col-12">
      <ClientOnly>
        <VForm
          v-if="showForm"
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
                    {{ $t('Create') }}
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
  createSample,
} from '~/services/samples'
import { useFormHook } from '~/composables/useFormHook'

useHead({
  title: 'Admin - Create sample',
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
const showForm = ref(false)

onNuxtReady(async () => {
  const currentLang = currentLangState()
  currentLangCode.value = currentLang.get?.value

  showForm.value = true
  await nextTick()
})

const dataForm = ref({
  title: '',
})

const onSubmit = async (values) => {
  pendingSubmitForm.value = true
  const dataSample = {
    title: values.title,
  }

  const { data: res, error: errorSubmit } = await createSample(dataSample)

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
