<script setup lang="ts">
import moment from 'moment'
import DeleteProjectModal from '~/components/DeleteProjectModal.vue';

const id = ref<string>('')
const title = ref<string>('')
const isOpen = ref<boolean>(false)

const { data: projects, pending, refresh: refreshProjects } = useLazyFetch('/api/projects')

// auto detect if the user is logged in (using nuxt3 middleware)...
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: "Admin (Projects)"
})
</script>

<template>
  <NuxtLayout>
    <div class="relative flex-1 w-full overflow-y-auto">
      <TopBar title="Projects" />
      <div v-if="pending" class="flex flex-col items-center w-full p-10">
        <Loader />
      </div>
      <div v-else-if="projects?.length === 0" class="flex flex-col items-center w-full p-10">
        <Empty message="projects" />
      </div>
      <div v-else v-for="project in projects" :key="project.id" class="flex flex-col w-full">
        <div class="flex flex-col md:flex-row w-full h-auto overflow-hidden border-b border-accent-4">
          <div class="relative overflow-hidden w-full md:w-[100vh] h-[40vh]">
            <NuxtImg
              preload
              class="w-full h-full object-cover bg-accent-4"
              :src="`${project.image ?? '/images/placeholder.png'}`"
              alt="Veoscript Logo"
            />
          </div>
          <div class="flex flex-col w-full h-full p-5 space-y-5">
            <div class="flex flex-col w-full h-full space-y-5">
              <div class="flex flex-row items-center justify-between w-full space-x-10">
                <div class="flex flex-col space-y-1">
                  <h1 class="font-bold text-xl">{{ project.title }}</h1>
                  <span class="font-light text-xs text-neutral-500">Created at - {{ moment(project.createdAt).format('LLLL') }}</span>
                </div>
                <div class="flex flex-col md:flex-row items-center space-x-0 md:space-x-1 space-y-1 md:space-y-0">
                  <NuxtLink
                    :to="`/projects/edit/${project.id}`"
                    class="w-20 md:w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-center text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    type="button"
                    class="w-20 md:w-auto px-5 py-1 rounded-full border border-red-500 font-light text-xs  text-centertext-red-500 transition ease-in-out duration-200 hover:opacity-50"
                    v-on:click="() => {
                      id = project.id
                      title = project.title
                      isOpen = true
                    }"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p class="font-light text-base">{{ project.description }}</p>
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
      <DeleteProjectModal
        :id="id"
        :title="title"
        :isOpen="isOpen"
        :setIsOpen="() => isOpen = false"
        :refreshProjects="refreshProjects"
      />
    </div>
  </NuxtLayout>
</template>