<script setup lang="ts">
useHead({
  title: "Admin (Projects)"
})
const { data: projects, pending } = useLazyFetch('/api/projects')
</script>

<template>
  <div class="flex-1 w-full overflow-y-auto">
    <TopBar title="Projects" />
    <div v-if="pending" class="flex flex-col items-center w-full p-10">
      <Loader />
    </div>
    <div v-else-if="projects?.length === 0" class="flex flex-col items-center w-full p-10">
      <Empty message="projects" />
    </div>
    <div v-else v-for="project in projects" :key="project.id" class="flex flex-col w-full p-5 space-y-3">
      <div class="flex flex-row w-full h-auto overflow-hidden rounded-xl border border-accent-4">
        <div class="relative overflow-hidden w-[100vh] h-[40vh]">
          <NuxtImg
            preload
            class="w-full h-full object-cover"
            :src="`${project.image ?? '/images/placeholder.png'}`"
            alt="Veoscript Logo"
          />
        </div>
        <div class="flex flex-col w-full h-full p-5 space-y-5">
          <div class="flex flex-col w-full h-full space-y-5">
            <div class="flex flex-row items-center justify-between w-full">
              <h1 class="font-bold text-lg">{{ project.title }}</h1>
              <div class="flex flex-row items-center space-x-1">
                <NuxtLink
                  to="/"
                  class="w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
                >
                  Edit
                </NuxtLink>
                <NuxtLink
                  to="/"
                  class="w-auto px-5 py-1 rounded-full border border-red-500 font-light text-xs text-red-500 transition ease-in-out duration-200 hover:opacity-50"
                >
                  Delete
                </NuxtLink>
              </div>
            </div>
            <p class="font-light text-sm">{{ project.description }}</p>
          </div>
          <div class="flex flex-row items-center w-full h-full space-x-2">
            <NuxtLink
              v-if="project.demoUrl"
              :to="`${project.demoUrl}`"
              target="_blank"
              class="w-auto px-5 py-3 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
            >
              Demo
            </NuxtLink>
            <NuxtLink
              v-if="project.sourceCode"
              :to="`${project.sourceCode}`"
              target="_blank"
              class="w-auto px-5 py-3 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
            >
              Source Code
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>