<script setup lang="ts">
useHead({
  title: "Admin (Projects)"
})
</script>
<template>
  <div class="flex-1 w-full overflow-y-auto">
    <TopBar title="Projects" />
    <div class="flex flex-col w-full p-5 space-y-3">
      <div class="flex flex-row w-full h-auto overflow-hidden rounded-xl border border-accent-4">
        <NuxtImg
          preload
          class="w-[70vh] h-auto object-cover"
          src="/images/placeholder.png"
          alt="Veoscript Logo"
        />
        <div class="flex flex-col w-full h-full p-5 space-y-5">
          <div class="flex flex-col w-full h-full space-y-5">
            <div class="flex flex-row items-center justify-between w-full">
              <h1 class="font-bold text-lg">Project Title</h1>
              <NuxtLink
                to="/"
                class="w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
              >
                Edit
              </NuxtLink>
            </div>
            <p class="font-light text-sm">
              Project description Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptas atque labore ullam assumenda sunt quas neque enim, nostrum, ut molestias et, aut earum magnam reprehenderit eligendi? Quae, sequi molestias.
            </p>
          </div>
          <div class="flex flex-row items-center w-full h-full space-x-2">
            <NuxtLink
              to="/"
              target="_blank"
              class="w-auto px-5 py-3 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
            >
              Demo
            </NuxtLink>
            <NuxtLink
              to="/"
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