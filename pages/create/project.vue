<script setup lang="ts">
useHead({
  title: "New Project"
})

const router = useRouter()

let isLoading = ref<boolean>(false)
let imageToUpload = ref<any>('')
let imageSource = ref<any>('')
let title = ref<string>('')
let description = ref<string>('')
let sourceCode = ref<string>('')
let demoUrl = ref<string>('')

const handleDefaultValue = () => {
  isLoading.value = false
  imageToUpload.value = ''
  imageSource.value = ''
  title.value = ''
  description.value = ''
  sourceCode.value = ''
  demoUrl.value = ''
}

const handleChangeImage = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  const allowedExtensions = /(\.jpg|\.jpeg|\.jfif|\.png)$/i

  if (e.target.value !== '' && !allowedExtensions.exec(e.target.value)) {
    e.target.value = ''
    alert('Please select jpg, jpeg or png only!')
    return
  }

  if (e.target.files[0].size > 2097152) {
    alert('Selected photo size exceeds 2 MB. Choose another one.')
    return
  }

  imageToUpload.value = e.target.files[0]

  reader.onload = () => {
    imageSource.value = reader.result
  }

  reader.readAsDataURL(file)
}

const handleCreateProject = async (e: Event) => {
  e.preventDefault()

  const config = useRuntimeConfig()

  try {
    let photo: string = ''

    if (imageSource && imageToUpload) {
      const body = new FormData()
      body.append('image', imageToUpload.value)

      isLoading.value = true

      await fetch(`https://api.imgbb.com/1/upload?key=${config.public.imgbbAPIKey}`, {
        method: 'POST',
        body: body
      })
      .then((response) => response.json())
      .then((result) => {
        photo = result.data.url
      })
      .then(async () => {
        await useFetch('/api/projects/create', {
          method: 'POST',
          body: {
            photo: photo,
            title: title.value,
            description: description.value,
            sourceCode: sourceCode.value,
            demoUrl: demoUrl.value,
          }
        })
        handleDefaultValue()
        router.push('/projects')
      })
      .catch((err) => {
        alert('Selected photo upload failed. Check your internet.')
        console.error(err)
        isLoading.value = false
      })
    }

  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="flex-1 w-full overflow-y-auto">
    <TopBar title="Create New Project" />
    <LoaderSubmit
      v-if="isLoading"
      message="Creating..."
    />
    <form v-on:submit="handleCreateProject" class="flex flex-col w-full p-10 space-y-5">
      <div class="flex flex-col items-center w-full">
        <div class="relative overflow-hidden w-[70vh] h-[40vh]">
          <NuxtImg
            preload
            class="w-full h-full object-cover rounded-xl bg-accent-4"
            :src="`${imageSource === '' ? '/images/placeholder.png' : imageSource}`"
            alt="Project Image"
          />
          <label
            for="upload-image"
            class="absolute bottom-3 right-3 w-auto p-3 font-light text-sm outline-none rounded-full cursor-pointer backdrop-blur-md bg-accent-3 bg-opacity-50 transition ease-in-out duration-200 hover:bg-opacity-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
            </svg>
          </label>
          <input
            type="file"
            id="upload-image"
            class="hidden"
            accept=".jpg, .png, .jpeg, .jfif"
            v-on:change="handleChangeImage"
          />
        </div>
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="title" class="ml-3 font-light text-sm text-neutral-400">Title <span class="text-red-500">*</span></label>
        <input
          id="title"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="title"
        >
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="description" class="ml-3 font-light text-sm text-neutral-400">Description <span class="text-red-500">*</span></label>
        <textarea
          id="description"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          cols="30"
          rows="5"
          v-model="description"
        />
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="source-code" class="ml-3 font-light text-sm text-neutral-400">Source Code</label>
        <input
          id="source-code"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="sourceCode"
        >
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="demo-url" class="ml-3 font-light text-sm text-neutral-400">Demo Url</label>
        <input
          id="demo-url"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="demoUrl"
        >
      </div>
      <div class="flex flex-col items-end w-full space-y-2">
        <button
          :disabled="isLoading"
          type="submit"
          :class="`w-auto px-5 py-2 rounded-full border border-accent-4 text-sm text-accent-3 bg-accent-1 transition ease-in-out duration-200 hover:opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`"
        >
          {{ isLoading ? 'Creating...' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>