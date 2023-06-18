<script setup lang="ts">
useHead({
  title: "Admin (Blogs)"
})
const { data: blogs, pending } = useLazyFetch('/api/blogs')
</script>
<template>
  <div class="flex-1 w-full overflow-y-auto">
    <TopBar title="Blogs" />
    <div v-if="pending" class="flex flex-col items-center w-full p-10">
      <Loader />
    </div>
    <div v-else-if="blogs?.length === 0" class="flex flex-col items-center w-full p-10">
      <Empty message="blogs" />
    </div>
    <div v-else v-for="blog in blogs" :key="blog.id" class="flex flex-col w-full p-5 space-y-3">
      <div class="flex flex-row w-full h-auto overflow-hidden rounded-xl border border-accent-4">
        <NuxtImg
          preload
          class="w-[70vh] h-auto object-cover"
          :src="`${blog.image ?? '/images/placeholder.png'}`"
          alt="Veoscript Logo"
        />
        <div class="flex flex-col w-full h-full p-5 space-y-5">
          <div class="flex flex-col w-full h-full space-y-5">
            <div class="flex flex-row items-center justify-between w-full">
              <h1 class="font-bold text-lg">{{ blog.title }}</h1>
              <NuxtLink
                to="/"
                class="w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
              >
                Edit
              </NuxtLink>
            </div>
            <p class="font-light text-sm">{{ blog.article }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>