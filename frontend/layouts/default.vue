<template>
  <div class="div-bg-top-custom" />
  <div class="main-container">
    <div class="row">
      <div class="col-12">
        <div class="div-header-time">
          {{ formattedTime }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div
          id="body_root"
          :class="`desktop chrome webkit pace-done mod-bg-1 mod-nav-link header-function-fixed nav-function-fixed nav-function-top blur`"
        >
          <Header />

          <div class="div-body">
            <slot />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

useHead({
  script: [
    {
      src: 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js',
      defer: true,
    },
  ],
  bodyAttrs: {
    class:
        'desktop chrome webkit pace-done mod-bg-1 mod-nav-link header-function-fixed nav-function-fixed nav-function-top',
  },
})

const timezone = 'Asia/Bangkok'
const formattedTime = ref(formatTime())
const config = useRuntimeConfig()

function formatTime() {
  const now = zonedTimeToUtc(new Date(), timezone)
  return format(now, 'yyyy-MM-dd hh:mm:ss a')
}

let interval

onMounted(() => {
  interval = setInterval(() => {
    formattedTime.value = formatTime()
  }, 1000)
  setTimeout(() => {
    $(window).on('popstate', function () {
      $('.modal').modal('hide')
      $('.modal-backdrop').remove()
      $('.in').remove()

      $('.select2-container').remove()
    })
  }, 100)

  window.OneSignalDeferred = window.OneSignalDeferred || []
  window.OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({
      appId: config.public.oneSignalAppId,
    })
  })
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
  .main-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 15px;
  }
.div-body {
  min-height: calc(100vh - 120px);
  padding-bottom: 100px;
}
.div-body-content {
  width: 100%;
  padding: 8px;
}
  .div-header-time {
    width: 100%;
    background: linear-gradient(135deg, #e8f0fe, #f4f6fb);
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #2a2a2a;
    display: inline-block;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
.div-body {
  width: auto !important;
  padding: 4px;
}
  .div-bg-top-custom {
    position: relative;
    z-index: 0;
    overflow: visible;
  }

  .div-bg-top-custom::before {
    content: "";
    position: absolute;
    top: -12vw;
    left: -25vw;
    width: 42vw;
    height: 42vw;
    background: rgba(173, 216, 255, 0.5);
    filter: blur(12vw);
    border-radius: 50%;
    z-index: -1;
  }

  .div-bg-top-custom::after {
    content: "";
    position: absolute;
    top: -6vw;
    right: -20vw;
    width: 38vw;
    height: 38vw;
    background: rgba(255, 182, 193, 0.45);
    filter: blur(11vw);
    border-radius: 50%;
    z-index: -1;
  }
</style>

<style>
.binance-widget__footer {
  display: none !important;
}
</style>
