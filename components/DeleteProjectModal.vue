<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  setIsOpen: {
    type: Function,
    required: true,
  },
  refreshProjects: {
    type: Function,
    required: true,
  }
})

let isLoading = ref<boolean>(false)

const handleDeleteProject = async () => {
  isLoading.value = true

  await useFetch(`/api/projects/delete/${props.id}`, {
    method: 'DELETE'
  })

  isLoading.value = false
  props.setIsOpen(false)
  props.refreshProjects()
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 flex flex-col items-center justify-center w-full h-full backdrop-blur-xl bg-black bg-opacity-50">
    <button
      class="absolute flex-1 w-full h-full outline-none cursor-default bg-transparent"
      v-on:click="() => isOpen ? setIsOpen(false) : null"
    />
    <div class="z-20 flex flex-col items-center w-full max-w-xl p-10 space-y-10 rounded-xl border border-red-500 bg-accent-3">
      <p>Are you sure you want to delete this project <span class="font-bold">{{ title }}</span>?</p>
      <div class="flex flex-row items-center justify-center w-full space-x-1">
        <button
          :disabled="isLoading"
          type="button"
          :class="`flex flex-row items-center w-auto px-5 py-2 space-x-1 rounded-full text-sm text-white bg-red-500 transition ease-in-out duration-200 hover:opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`"
          v-on:click="handleDeleteProject"
        >
          {{ isLoading ? 'Deleting' : 'Delete' }}
        </button>
        <button
          :disabled="isLoading"
          type="button"
          :class="`flex flex-row items-center w-auto px-5 py-2 space-x-1 rounded-full text-sm text-white bg-accent-4 transition ease-in-out duration-200 hover:opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`"
          v-on:click="() => setIsOpen(false)"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>