<template>
  <header
    class="div-header"
    role="banner"
  >
    <div class="d-flex gap-2">
      <div class="div-logo user-select-none">
        <NuxtLinkLocale :to="'/'">
          {{ config.public.appName }}
        </NuxtLinkLocale>
      </div>
      <div class="div-switch-lang">
        <div>
          <span class="header-icon cursor-pointer user-select-none text-right">
            <img
              v-if="locale === 'en'"
              src="/img/flags/en.gif"
              alt=""
              @click="setLocale('vn'), setStateCurrentLang('vn')"
            >
            <img
              v-else-if="locale === 'vn'"
              src="/img/flags/vn.gif"
              alt=""
              @click="setLocale('en'), setStateCurrentLang('en')"
            >
          </span>
        </div>
      </div>
    </div>
  </header>

  <div
    v-if="listCategory?.root?.length > 0"
    class="div-header-category"
  >
    <ul class="category-list">
      <li class="item-li">
        <NuxtLinkLocale :to="'/'">
          {{ $t('Home') }}
        </NuxtLinkLocale>
      </li>

      <li
        v-for="item in listCategory.root"
        :key="item.id"
        class="item-li"
        :class="{ 'has-dropdown': listCategory.list_sub[item.id] }"
      >
        <NuxtLinkLocale :to="'/category/' + (locale === 'en' ? item.slug : item.slug_vi)">
          {{ locale === 'en' ? item.name_en : item.name_vi }}
        </NuxtLinkLocale>

        <ul
          v-if="listCategory.list_sub[item.id]"
          class="dropdown-menu"
        >
          <li
            v-for="subItem in listCategory.list_sub[item.id]"
            :key="subItem.id"
            class="item-li"
            :class="{ 'has-dropdown': listCategory.list_sub[item.id] }"
          >
            <NuxtLinkLocale
              :to="'/category/' + (locale === 'en' ? subItem.slug : subItem.slug_vi)"
              class="dropdown-item"
            >
              {{ locale === 'en' ? subItem.name_en : subItem.name_vi }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { currentLangState } from '~/store'

const { locale, setLocale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value === 'vn' ? 'vi' : locale.value || 'vi',
  },
})

const config = useRuntimeConfig()
const listCategory = ref([])

const setStateCurrentLang = (lang = '') => {
  const currentLang = currentLangState()
  const newLang = lang || locale.value || 'vn'
  currentLang.set(newLang)
  useHead({
    htmlAttrs: {
      lang: newLang === 'vn' ? 'vi' : newLang,
    },
  })
}

onMounted(async () => {
  if (!locale.value) {
    setLocale('vn')
  }
  setStateCurrentLang()
})
</script>

<style scoped>
  .div-header,
  .div-header-category {
    margin: 8px;
  }
  .div-logo {
    padding: 16px;
    width: 100%;
    display: flex;
    height: 100%;
    font-size: 32px;
    text-transform: uppercase;
    font-weight: bold;
  }
  .div-switch-lang {
    width: 50px;
  }

  .div-header-category {
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    background-color: #ffffff;
    padding: 10px 10px 2px 10px;
    /*margin-top: 20px;*/
    margin-bottom: 30px;
    font-weight: 600;
  }

  .div-header-category .item-li a {
    padding: 8px;
    border-radius: 8px;
  }
  .div-header-category .item-li a:hover {
    background: #f1f1f1;
  }

  .category-list {
    list-style: none;
    padding: 4px;
    margin: 0;
    /*display: flex;*/
    gap: 4px;
    /*white-space: nowrap;*/
  }

  .category-list > li {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 8px;
    position: relative;
  }

  .has-dropdown > .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
  }

  .category-list > li:hover > .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .dropdown-item {
    padding: 8px 16px;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #ddd;
  }

  .dropdown-menu .dropdown-item {
    padding: 8px 16px;
  }

  .dropdown-menu .dropdown-item:hover {
    background-color: #f1f1f1;
  }
</style>

<style>
.div-logo a {
  display: inline-block;
  background: linear-gradient( #0072ff, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}
</style>
