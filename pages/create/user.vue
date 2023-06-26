<script setup lang="ts">
import { toast } from 'vue3-toastify'

const router = useRouter()

let isLoading = ref<boolean>(false)
let imageToUpload = ref<any>('')
let imageSource = ref<any>('')
let name = ref<string>('')
let username = ref<string>('')
let email = ref<string>('')
let password = ref<string>('')
let repassword = ref<string>('')

let nameError = ref<string>('')
let emailError = ref<string>('')
let passwordError = ref<string>('')
let repasswordError = ref<string>('')

const handleDefaultValue = () => {
  isLoading.value = false
  imageToUpload.value = ''
  imageSource.value = ''
  name.value = ''
  username.value = ''
  email.value = ''
  password.value = ''
  repassword.value = ''
}

const handleChangeImage = (e: any) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  const allowedExtensions = /(\.jpg|\.jpeg|\.jfif|\.png|\.webp)$/i

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

  if (name.value === '') return nameError.value = 'Name is required'
  if (email.value === '') return emailError.value = 'Email is required'
  if (password.value === '') return passwordError.value = 'Password is required'
  if (repassword.value === '') return repasswordError.value = 'Re-enter password is required'
  if (password.value !== repassword.value) return passwordError.value = 'Password not match, try again'

  try {
    let photo: string = ''

    if (imageToUpload.value) {
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
        const createUser = await useFetch('/api/users/create', {
          method: 'POST',
          body: {
            photo: photo,
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
          }
        })

        if (createUser.error.value) {
          toast.dark(String(createUser.error.value.statusMessage), {
            autoClose: 5000,
            dangerouslyHTMLString: true,
            bodyClassName: "font-poppins font-light text-sm text-red-500",
            hideProgressBar: true,
          });
          isLoading.value = false
          return
        } else {
          toast.dark("User created successfully.", {
            autoClose: 5000,
            dangerouslyHTMLString: true,
            bodyClassName: "font-poppins font-light text-sm text-greed-500",
            hideProgressBar: true,
          });
        }

        handleDefaultValue()
        router.push('/admin-users')
      })
      .catch((err) => {
        alert('Selected photo upload failed. Check your internet.')
        console.error(err)
        isLoading.value = false
      })
    } else {
      isLoading.value = true

      const createUser = await useFetch('/api/users/create', {
        method: 'POST',
        body: {
          photo: photo,
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        }
      })

      if (createUser.error.value) {
        toast.dark(String(createUser.error.value.statusMessage), {
          autoClose: 5000,
          dangerouslyHTMLString: true,
          bodyClassName: "font-poppins font-light text-sm text-red-500",
          hideProgressBar: true,
        });
        isLoading.value = false
        return
      } else {
        toast.dark("User created successfully.", {
          autoClose: 5000,
          dangerouslyHTMLString: true,
          bodyClassName: "font-poppins font-light text-sm text-greed-500",
          hideProgressBar: true,
        });
      }

      handleDefaultValue()
      router.push('/admin-users')
    }

  } catch (err) {
    console.error(err)
  }
}

// auto detect if the user is logged in (using nuxt3 middleware)...
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: "Create Admin User"
})
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 w-full overflow-y-auto">
      <TopBar title="Create Admin User" />
      <LoaderSubmit
        v-if="isLoading"
        message="Creating..."
      />
      <form v-on:submit="handleCreateProject" class="flex flex-col w-full p-10 space-y-5">
        <div class="flex flex-col items-center w-full">
          <div class="relative overflow-hidden w-[30vh] h-[30vh]">
            <NuxtImg
              preload
              class="w-full h-full object-cover rounded-full bg-accent-4"
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
          <label for="name" class="ml-3 font-light text-sm text-neutral-400">Name <span class="text-red-500">*</span></label>
          <input
            id="name"
            type="text"
            class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
            v-model="name"
            v-on:input="() => nameError = ''"
          >
          <span v-if="nameError" class="ml-3 font-light text-xs text-red-500">{{ nameError }}</span>
        </div>
        <div class="flex flex-row items-center w-full space-x-2">
          <div class="flex flex-col w-full space-y-2">
            <label for="username" class="ml-3 font-light text-sm text-neutral-400">Username</label>
            <input
              id="username"
              type="text"
              class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
              v-model="username"
            >
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label for="email" class="ml-3 font-light text-sm text-neutral-400">Email <span class="text-red-500">*</span></label>
            <input
              id="email"
              type="email"
              class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
              v-model="email"
              v-on:input="() => emailError = ''"
            >
            <span v-if="emailError" class="ml-3 font-light text-xs text-red-500">{{ emailError }}</span>
          </div>
        </div>
        <div class="flex flex-row items-center w-full space-x-2">
          <div class="flex flex-col w-full space-y-2">
            <label for="password" class="ml-3 font-light text-sm text-neutral-400">Password <span class="text-red-500">*</span></label>
            <input
              id="password"
              type="password"
              class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
              v-model="password"
              v-on:input="() => passwordError = ''"
            >
            <span v-if="passwordError" class="ml-3 font-light text-xs text-red-500">{{ passwordError }}</span>
          </div>
          <div class="flex flex-col w-full space-y-2">
            <label for="repassword" class="ml-3 font-light text-sm text-neutral-400">Re-enter Password <span class="text-red-500">*</span></label>
            <input
              id="repassword"
              type="password"
              class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
              v-model="repassword"
              v-on:input="() => repasswordError = ''"
            >
            <span v-if="repasswordError" class="ml-3 font-light text-xs text-red-500">{{ repasswordError }}</span>
          </div>
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
  </NuxtLayout>
</template>