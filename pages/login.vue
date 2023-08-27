<script setup lang="ts">
import { toast } from 'vue3-toastify'

const router = useRouter()

const isLoading = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const emailError = ref<string>('')
const passwordError = ref<string>('')

const { data: session, pending: sessionPending } = await useLazyFetch('/api/auth/session', {
  headers: useRequestHeaders(),
})

watch(sessionPending, () => {
  // if the user is already logged in route to Dashboard
  if (session.value?.user) return router.push('/')
}, { immediate: true })

const handleDefault = () => {
  isLoading.value = false
  email.value = ''
  password.value = ''
  emailError.value = ''
  passwordError.value = ''
}

const handleLogin = async (e: Event) => {
  e.preventDefault()

  if (email.value === '') return emailError.value = 'Email is required'
  if (password.value === '') return passwordError.value = 'Password is required'

  isLoading.value = true

  const login = await useFetch('/api/auth/login', {
    method: 'POST',
    body: {
      email,
      password
    }
  })

  if (login.data?.value?.status === 401) {
    toast.dark(login.data?.value?.error, {
      autoClose: 5000,
      dangerouslyHTMLString: true,
      bodyClassName: "font-poppins font-light text-sm text-red-500",
      hideProgressBar: true,
    });
    isLoading.value = false
    return
  }

  handleDefault()
  router.push('/')
}

useHead({
  title: "Admin (Login)"
})
</script>

<template>
  <NuxtLayout name="authlayout">
    <form v-on:submit="handleLogin" class="flex flex-col items-center w-full space-y-3">
      <div class="flex flex-col w-full space-y-2">
        <label for="name" class="ml-3 font-light text-sm text-neutral-400">Email</label>
        <input
          id="email"
          type="text"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="email"
          v-on:input="() => emailError = ''"
        >
        <span v-if="emailError" class="ml-3 font-light text-xs text-red-500">{{ emailError }}</span>
      </div>
      <div class="flex flex-col w-full space-y-2">
        <label for="password" class="ml-3 font-light text-sm text-neutral-400">Password</label>
        <input
          id="password"
          type="password"
          class="w-full p-3 outline-none rounded-xl border border-accent-4 bg-transparent focus:border-accent-1"
          v-model="password"
          v-on:input="() => passwordError = ''"
        >
        <span v-if="passwordError" class="ml-3 font-light text-xs text-red-500">{{ passwordError }}</span>
      </div>
      <div class="flex flex-col items-end w-full space-y-2">
        <button
          :disabled="isLoading"
          type="submit"
          :class="`w-auto px-5 py-2 rounded-full border border-accent-4 text-sm text-accent-3 bg-accent-1 transition ease-in-out duration-200 hover:opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`"
        >
          {{ isLoading ? 'Loading...' : 'Log in' }}
        </button>
      </div>
    </form>
  </NuxtLayout>
</template>