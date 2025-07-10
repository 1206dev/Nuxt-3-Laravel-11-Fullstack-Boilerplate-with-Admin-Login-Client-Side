<template>
  <div align="center">
    <div class="mt-3">
      <div class="card card-body div-form-header">
        {{ $t('Login') }}
      </div>
      <div
        id="form-login"
        class="card card-body"
      >
        <ClientOnly>
          <VForm
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
              <div class="div-form-login text-left">
                <div class="form-group mb-3">
                  <label
                    class="form-label"
                  >{{ $t('Username') }} <span class="required">(*)</span></label>
                  <VField
                    name="username"
                    type="text"
                    class="form-control"
                    :class="errors.username && 'vee-is-invalid'"
                  />
                  <VErrorMessage
                    name="username"
                    class="invalid-feedback"
                  />
                </div>

                <div class="form-group">
                  <label
                    class="form-label"
                  >{{ $t('Password') }} <span class="required">(*)</span></label>
                  <VField
                    name="password"
                    type="password"
                    class="form-control"
                    :class="errors.password && 'vee-is-invalid'"
                  />
                  <VErrorMessage
                    name="password"
                    class="invalid-feedback"
                  />
                </div>
              </div>
              <button
                :disabled="pendingForm"
                type="submit"
                class="btn btn-primary waves-effect waves-themed btn-get-lead mt-3 float-right"
              >
                {{ $t('Login') }}
              </button>
            </form>
          </VForm>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useAPI } from '~/composables/useAPI'
import { authState, currentLangState, dataState } from '~/store'
import { getCurrentUser } from '~/services/users'
import {
  ONE_WEEK,
} from '~/constants'
import { useFormHook } from '~/composables/useFormHook'

const { t } = useI18n()
const { locale } = useI18n()

const config = useRuntimeConfig()

const { $toast } = useNuxtApp()

definePageMeta({
  ssr: false,
  middleware: ['guest'],
  layout: 'auth',
})

useHead({
  title: t('login'),
})

const dataForm = ref({
  username: '',
  password: '',
})

// focus input errors
const { onInvalidSubmit } = useFormHook()

const pendingForm = ref(false)

const schema = yup.object({
  username: yup.string().trim().required(t('This field is required.')),
  password: yup.string().trim().required(t('This field is required.')),
})

if (import.meta.client) {
  const router = useRouter()
  const auth = authState()
  const currentLang = currentLangState()
  currentLang.set(locale.value || 'vn')

  const userInfo = ref({})
  userInfo.value = currentUser()

  const flgCallFirstLogin = ref(true)
  const latestAuthValue = auth.getData()
  watch(latestAuthValue, async (dataAuth) => {
    userInfo.value = currentUser()
    if (isObjectNotEmpty(userInfo.value)) {
      const expireDate = auth.getExpireDate?.value
      if (expireDate) {
        const now = new Date()
        const expireDateObj = new Date(expireDate)
        if (expireDateObj > now && flgCallFirstLogin.value) {
          flgCallFirstLogin.value = false
          const dataUser = await getCurrentUser()
          if (dataUser) {
            await auth.set(dataUser)
            await navigateTo(getLocalePath(`/admin`, locale.value))
          }
        }
      }
    }
  }, { deep: true })
}

const onSubmit = async (values) => {
  pendingForm.value = true

  return await useAPI<unknown>('/api/oauth/login', {
    body: {
      username: values.username,
      password: values.password,
    },
    method: 'POST',
    server: false,
  }).then(async (res) => {
    const auth = authState()
    await auth.set(null)
    const data = res.data.value
    const error = res.error.value

    if (data && data.access_token) {
      auth.set({ username: values.username }, new Date(Date.now() + (data.expires_in ? (data.expires_in * 1000) : ONE_WEEK)))

      const dataUser = await getCurrentUser()
      if (dataUser) {
        await navigateTo(getLocalePath(`/admin`, locale.value))
      }
    }
    else {
    }

    return res
  })
    .catch((err) => {
      $toast.error('An error has occurred, please check them again.')
      console.error(err)
    })
    .finally(() => {
      pendingForm.value = false
    })
}
</script>

<style scoped>
.div-form-header {
  width: 400px;
  font-weight: 500;
  /*background: #F58220;*/
  color: #043B72;
  font-size: 20px;
  padding: 6px;
  box-shadow: 0px 0px 13px 0px rgba(74, 53, 107, 0.08);
  border-bottom: 2px solid #043B72;
  /*border: 1px solid #F58220;*/
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
#form-login {
  width: 400px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
