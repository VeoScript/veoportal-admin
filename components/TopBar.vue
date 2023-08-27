<script setup lang="ts">
import { useSideBarMenuStore } from "~/stores/global"

const sideBarStore = useSideBarMenuStore()

const route = useRoute()
const router = useRouter()

defineProps({
  title: {
    type: String,
    require: true
  }
})
</script>

<template>
  <div class="sticky top-0 z-10 flex flex-row items-center justify-between w-full px-10 py-5 border-b border-accent-4 backdrop-blur-xl bg-transparent bg-opacity-50">
    <div class="flex flex-row items-center space-x-5">
      <button
        class="block md:hidden outline-none"
        @click="sideBarStore.setIsShow(true)"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path>
        </svg>
      </button>
      <div class="flex flex-row items-center space-x-2">
        <svg v-if="route.path === '/'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
        </svg>
        <svg v-if="route.path === '/projects'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"></path>
        </svg>
        <svg v-if="route.path === '/blogs'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path>
        </svg>
        <svg v-if="route.path === '/admin-users'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
        </svg>
        <h1 class="font-bold text-xl">{{ title }}</h1>
      </div>
    </div>
    <NuxtLink
      v-if="route.path === '/projects' || route.path === '/blogs'"
      :to="`${route.path === '/projects' ? '/create/project' : '/create/blog'}`"
      class="flex flex-row items-center w-auto px-5 py-2 space-x-1 rounded-full text-sm text-accent-3 bg-accent-1 transition ease-in-out duration-200 hover:opacity-50"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>New {{ route.path === '/projects' ? 'Project' : 'Blog' }}</span>
    </NuxtLink>
    <button
      v-if="route.path === '/create/project' || route.path === '/create/blog'"
      type="button"
      class="w-auto px-5 py-2 rounded-full border border-accent-4 text-sm text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
      v-on:click="() => router.back()"
    >
      Back
    </button>
    <div v-if="route.path === '/admin-users'" class="flex flex-row items-center space-x-3">
      <button
        type="button"
        class="w-auto px-5 py-2 rounded-full border border-accent-4 text-sm text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
        v-on:click="() => router.push('/')"
      >
        Back
      </button>
      <NuxtLink
        to="/create/user"
        class="flex flex-row items-center w-auto px-5 py-2 space-x-1 rounded-full text-sm text-accent-3 bg-accent-1 transition ease-in-out duration-200 hover:opacity-50"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Create User</span>
      </NuxtLink>
    </div>
  </div>
</template>