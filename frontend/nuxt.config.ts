// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: 'VForm',
          Field: 'VField',
          FieldArray: 'VFieldArray',
          ErrorMessage: 'VErrorMessage',
        },
        classes: true,
      },
    ], '@samk-dev/nuxt-vcalendar',
    ['@nuxtjs/i18n', {
      lazy: true,
      langDir: 'locales',
      strategy: 'prefix_except_default',
      defaultLocale: 'vn',
      locales: [
        { code: 'vn', iso: 'vi-VI', file: 'vn.json' },
        { code: 'en', iso: 'en-US', file: 'en.json' },
      ],
    }],
  ],
  ssr: true,
  components: [
    '~/components',
  ],
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Base',
      meta: [
        {
          name: 'description',
          content: 'Base',
        },
        { property: 'og:image', content: '/img/thumbnail_default.jpg' },
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5',
        },
        { name: 'apple-mobile-web-app-title', content: 'Basic Tables' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'format-detection', content: 'date=no' },
        { name: 'format-detection', content: 'address=no' },
        { name: 'format-detection', content: 'email=no' },
        { name: 'theme-color', content: '#37393e' },
        { name: 'msapplication-tap-highlight', content: '#37393e' },
        { name: 'google-adsense-account', content: 'ca-pub-5618110308163033' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        { rel: 'stylesheet', href: '/css/select2/select2.bundle.css' },
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'http://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css' },
        { rel: 'stylesheet', href: 'http://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/theme/monokai.css' },
        { rel: 'stylesheet', href: 'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css' },
      ],
      script: [
        { src: '/js/vendors.bundle.js' },
        { src: 'https://code.jquery.com/jquery-3.5.1.min.js', type: 'text/javascript' },
        { src: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js', type: 'text/javascript' },
        { src: '/js/select2/select2.bundle.js' },
        { src: 'http://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js', type: 'text/javascript' },
        { src: 'http://cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.js', type: 'text/javascript' },
        { src: 'http://cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.js', type: 'text/javascript' },
        { src: 'http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.js', type: 'text/javascript' },
      ],
    },
  },
  css: [
    'assets/css/vendors.bundle.css',
    'assets/css/app.bundle.css',
    'assets/css/skins/skin-master.css',
    'assets/css/notifications/sweetalert2/sweetalert2.bundle.css',
    'assets/css/fa-solid.css',
    'assets/css/fa-regular.css',
    'assets/css/custom.css',
  ],
  runtimeConfig: {
    public: {
      cookieName: 'token',
      apiUrl: process.env.API_URL,
      appName: process.env.APP_NAME,
      oneSignalAppId: process.env.ONE_SIGNAL_APP_ID,
    },
  },
  routeRules: {},
  devServer: {
    host: process.env.BASE_HOST || 'localhost',
    port: (process.env.BASE_PORT || 3000) as number,
  },
  vite: {
    server: {
      host: true,
      allowedHosts: 'all',
      disableHostCheck: true,
    },
  },
  prerender: {
    crawlLinks: false,
    routes: [],
    ignore: ['/admin/**', '/auth/**', '/en/admin/**', '/en/auth/**'],
  },
  server: {
    host: '0.0.0.0',
    port: process.env.BASE_PORT || 3000,
  },
})
