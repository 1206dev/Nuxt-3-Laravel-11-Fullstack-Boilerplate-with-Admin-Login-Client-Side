<template>
  <aside
    class="sidebar"
    :class="{ collapsed: isCollapsed || isMobile }"
  >
    <div
      v-if="!isCollapsed && !isMobile"
      class="logo"
    >
      Blog
    </div>
    <nav>
      <ul>
        <li
          v-for="item in items"
          :key="item.path"
          :class="{ active: isActive(item.path) }"
        >
          <NuxtLinkLocale :to="item.path">
            <i :class="item.icon" />
            <span v-if="!isCollapsed && !isMobile">{{ item.name }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </nav>
    <button
      v-if="!isMobile"
      class="toggle-btn"
      @click="toggleSidebar"
    >
      <i class="fas fa-bars" />
    </button>
  </aside>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

defineProps({ items: Array })

const route = useRoute()
const isActive = (path) => {
  const cleanPath = route.path.split('?')[0]
  if (path === '/admin' && cleanPath === path || cleanPath === `/vn${path}` || cleanPath === `/en${path}`) {
    return true
  }
  return path !== '/admin' && cleanPath.includes(path)
}

const isCollapsed = ref(false)
const isMobile = ref(!import.meta.client ? false : window.innerWidth < 1024)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
  if (window.innerWidth < 1024) isCollapsed.value = true
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #f8f9fc;
  color: #4a4a4a;
  padding: 12px;
  height: 100%;
  transition: width 0.3s;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 0 20px 20px 0;
  position: relative;
}
.sidebar.collapsed {
  width: 60px;
  padding: 10px;
}
.sidebar .logo {
  font-size: 22px;
  font-weight: bold;
  color: #2a2e3f;
  text-align: center;
  margin-bottom: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  border-radius: 8px;
  margin-bottom: 8px;
}
.sidebar li a {
  padding: 12px 12px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.sidebar li.active,
.sidebar li:hover {
  background: linear-gradient(135deg, #6574cd, #556cd6);
  color: white;
}
.sidebar a {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
}
.sidebar li i {
  margin-right: 12px;
  font-size: 18px;
}
.sidebar.collapsed li i {
  margin-right: 0;
  text-align: center;
  width: 100%;
}
.sidebar.collapsed a {
  justify-content: center;
}
.toggle-btn {
  background: #6574cd;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  width: 40px;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.3s;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.toggle-btn i {
  line-height: unset;
}
.toggle-btn:hover {
  background: #556cd6;
}
</style>
