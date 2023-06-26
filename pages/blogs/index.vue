<script setup lang="ts">
import moment from 'moment'

const id = ref<string>('')
const title = ref<string>('')
const isOpen = ref<boolean>(false)

const { data: blogs, pending, refresh: refreshBlogs } = useLazyFetch('/api/blogs')

// auto detect if the user is logged in (using nuxt3 middleware)...
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: "Admin (Blogs)"
})
</script>

<template>
  <NuxtLayout>
    <div class="relative flex-1 w-full overflow-y-auto">
      <TopBar title="Blogs" />
      <div v-if="pending" class="flex flex-col items-center w-full p-10">
        <Loader />
      </div>
      <div v-else-if="blogs?.length === 0" class="flex flex-col items-center w-full p-10">
        <Empty message="blogs" />
      </div>
      <div v-else v-for="blog in blogs" :key="blog.id" class="flex flex-col w-full">
        <div class="flex flex-row w-full h-auto overflow-hidden border-b border-accent-4">
          <div class="relative overflow-hidden w-[100vh] h-[40vh]">
            <NuxtImg
              preload
              class="w-full h-full object-cover bg-accent-4"
              :src="`${blog.image ?? '/images/placeholder.png'}`"
              alt="Veoscript Logo"
            />
          </div>
          <div class="flex flex-col w-full h-full p-5 space-y-5">
            <div class="flex flex-col w-full h-full space-y-5">
              <div class="flex flex-row items-center justify-between w-full">
                <div class="flex flex-col space-y-1">
                  <h1 class="font-bold text-xl">{{ blog.title }}</h1>
                  <span class="font-light text-xs text-neutral-500">Created at - {{ moment(blog.createdAt).format('LLLL') }}</span>
                </div>
                <div class="flex flex-row items-center space-x-1">
                  <NuxtLink
                    :to="`/blogs/edit/${blog.id}`"
                    class="w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    type="button"
                    class="w-auto px-5 py-1 rounded-full border border-red-500 font-light text-xs text-red-500 transition ease-in-out duration-200 hover:opacity-50"
                    v-on:click="() => {
                      id = blog.id
                      title = blog.title
                      isOpen = true
                    }"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <article 
                class="cms-content"
                v-html="$mdRenderer.render(blog.article)"
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteBlogModal
        :id="id"
        :title="title"
        :isOpen="isOpen"
        :setIsOpen="() => isOpen = false"
        :refreshBlogs="refreshBlogs"
      />
    </div>
  </NuxtLayout>
</template>