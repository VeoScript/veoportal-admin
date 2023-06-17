<script setup lang="ts">
useHead({
  title: "New Blog"
})
</script>
<template>
  <div class="flex-1 w-full overflow-y-auto">
    <TopBar title="Create New Blog" />
    <div class="flex flex-col w-full p-10 space-y-3">
      <div class="flex flex-col w-full space-y-2">
        <label for="title" class="ml-3 font-light text-sm text-neutral-400">Title <span class="text-red-500">*</span></label>
        <input
          id="title"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
        >
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="topic" class="ml-3 font-light text-sm text-neutral-400">Topic <span class="text-red-500">*</span></label>
        <input
          id="topic"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
        >
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="article" class="ml-3 font-light text-sm text-neutral-400">Article <span class="text-red-500">*</span></label>
        <textarea
          id="article"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          cols="30"
          rows="10"
        />
      </div>
      <div class="flex flex-col items-end w-full space-y-2">
        <button
          type="button"
          class="w-auto px-5 py-2 rounded-full border border-accent-4 text-sm text-accent-3 bg-accent-1 transition ease-in-out duration-200 hover:opacity-50"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>