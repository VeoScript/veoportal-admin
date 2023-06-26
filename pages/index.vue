<script setup lang="ts">
const { data: countBlogs, pending: isPendingCountBlogs } = await useLazyFetch('/api/counts/blogs')
const { data: countProjects, pending: isPendingCountProjects } = await useLazyFetch('/api/counts/projects')
const { data: countUserAccounts, pending: isPendingCountUserAccounts } = await useLazyFetch('/api/counts/user-accounts')

// auto detect if the user is logged in (using nuxt3 middleware)...
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: "Admin (Dashboard)"
})
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 w-full overflow-y-auto">
      <TopBar title="Dashboard" />
      <div class="flex flex-wrap items-center justify-center w-full p-10 gap-4">
        <div class="flex flex-col items-center w-full max-w-sm p-10 rounded-xl shadow-md bg-accent-4">
          <svg v-if="isPendingCountBlogs" class="animate-spin w-[5rem] h-[5rem] text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
          </svg>
          <h1 v-else class="font-bold text-[5rem] text-accent-1">{{ countBlogs }}</h1>
          <h2 class="font-light text-base">Projects</h2>
        </div>
        <div class="flex flex-col items-center w-full max-w-sm p-10 rounded-xl shadow-md bg-accent-4">
          <svg v-if="isPendingCountProjects" class="animate-spin w-[5rem] h-[5rem] text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
          </svg>
          <h1 v-else class="font-bold text-[5rem] text-blue-600">{{ countProjects }}</h1>
          <h2 class="font-light text-base">Blogs</h2>
        </div>
        <div class="flex flex-col items-center w-full max-w-sm p-10 rounded-xl shadow-md bg-accent-4">
          <svg v-if="isPendingCountUserAccounts" class="animate-spin w-[5rem] h-[5rem] text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
          </svg>
          <h1 v-else class="font-bold text-[5rem] text-green-500">{{ countUserAccounts }}</h1>
          <h2 class="font-light text-base">User Accounts</h2>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>