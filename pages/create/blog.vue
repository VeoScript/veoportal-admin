<script setup lang="ts">
import { toast } from 'vue3-toastify'

useHead({
  title: "New Blog"
})

const router = useRouter()

let isLoading = ref<boolean>(false)
let imageToUpload = ref<any>('')
let imageSource = ref<any>('')
let title = ref<string>('')
let topic = ref<string>('')
let article = ref<string>('')

let imageToUploadError = ref<any>('')
let titleError = ref<string>('')
let topicError = ref<string>('')
let articleError = ref<string>('')

const handleDefaultValue = () => {
  isLoading.value = false
  imageToUpload.value = ''
  imageSource.value = ''
  title.value = ''
  topic.value = ''
  article.value = ''
  imageToUploadError.value = ''
  titleError.value = ''
  topicError.value = ''
  articleError.value = ''
}

const handleChangeImage = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  const allowedExtensions = /(\.jpg|\.jpeg|\.jfif|\.png)$/i

  imageToUploadError.value = ''

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

const handleCreateBlog = async (e: Event) => {
  e.preventDefault()

  const config = useRuntimeConfig()

  if (imageToUpload.value === '') return imageToUploadError.value = 'Image is required'
  if (title.value === '') return titleError.value = 'Title is required'
  if (topic.value === '') return topicError.value = 'Topic is required'
  if (article.value === '') return articleError.value = 'Article is required'

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
        const createBlog = await useFetch('/api/blogs/create', {
          method: 'POST',
          body: {
            photo: photo,
            title: title.value,
            topic: topic.value,
            article: article.value,
          }
        })

        if (createBlog.error.value) {
          toast.dark(String(createBlog.error.value.statusMessage), {
            autoClose: 5000,
            dangerouslyHTMLString: true,
            bodyClassName: "font-poppins font-light text-sm text-red-500",
            hideProgressBar: true,
          });
          isLoading.value = false
          return
        } else {
          toast.dark("Blog created successfully.", {
            autoClose: 5000,
            dangerouslyHTMLString: true,
            bodyClassName: "font-poppins font-light text-sm text-greed-500",
            hideProgressBar: true,
          });
        }

        handleDefaultValue()
        router.push('/blogs')
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
    <TopBar title="Create New Blog" />
    <LoaderSubmit
      v-if="isLoading"
      message="Creating..."
    />
    <form v-on:submit="handleCreateBlog" class="flex flex-col w-full p-10 space-y-3">
      <div class="flex flex-col items-center w-full space-y-2">
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
        <span v-if="imageToUploadError" class="ml-3 font-light text-xs text-red-500">{{ imageToUploadError }}</span>
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="title" class="ml-3 font-light text-sm text-neutral-400">Title <span class="text-red-500">*</span></label>
        <input
          id="title"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="title"
          v-on:input="() => titleError = ''"
        >
        <span v-if="titleError" class="ml-3 font-light text-xs text-red-500">{{ titleError }}</span>
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="topic" class="ml-3 font-light text-sm text-neutral-400">Topic <span class="text-red-500">*</span></label>
        <input
          id="topic"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="topic"
          v-on:input="() => topicError = ''"
        >
        <span v-if="topicError" class="ml-3 font-light text-xs text-red-500">{{ topicError }}</span>
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="article" class="ml-3 font-light text-sm text-neutral-400">Article <span class="text-red-500">*</span></label>
        <textarea
          id="article"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          cols="30"
          rows="10"
          v-model="article"
          v-on:input="() => articleError = ''"
        />
        <span v-if="articleError" class="ml-3 font-light text-xs text-red-500">{{ articleError }}</span>
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