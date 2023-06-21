<script setup lang="ts">
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
      <div class="flex flex-col w-full p-10">
        <h1>Dashboard Body</h1>
      </div>
    </div>
  </NuxtLayout>
</template>