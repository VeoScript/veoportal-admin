<script setup lang="ts">
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
    <h1 class="font-bold text-xl">{{ title }}</h1>
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