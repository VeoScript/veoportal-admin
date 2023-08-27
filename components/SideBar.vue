<script setup lang="ts">
import { links } from "~/composables/static/links.js"

const { data: user, pending: isPendingUser } = await useLazyFetch('/api/users/user')

const route = useRoute()
const router = useRouter()

const isLoading = ref<boolean>(false)

const handleLogout = async () => {
  isLoading.value = true

  const logout = await useFetch('/api/auth/logout', {
    method: 'POST'
  })

  if (logout.data.value) {
    isLoading.value = false
    router.push('/login')
  } else {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-between w-full max-w-[15rem] h-full px-5 py-10 space-y-10 border-r border-accent-4">
    <NuxtLink to="/">
      <NuxtImg
        preload
        class="w-12"
        src="/images/veo.png"
        alt="Veoscript Logo"
      />
    </NuxtLink>
    <div class="flex flex-col items-center w-full space-y-10">
      <div class="flex flex-col items-center w-full space-y-3">
        <div v-if="isPendingUser" class="w-auto">
          <NuxtImg
            preload
            class="w-20 h-20 rounded-full object-cover"
            src="/images/placeholder.png"
            alt="Veoscript"
          />
        </div>
        <div v-else class="w-auto">
          <NuxtImg
            preload
            class="w-20 h-20 rounded-full object-cover"
            :src="user?.image === '' ? '/images/placeholder.png' : String(user?.image)"
            alt="Veoscript"
          />
        </div>
        <h1 v-if="isPendingUser" class="font-bold text-sm">Loading...</h1>
        <h1 v-if="!isPendingUser" class="font-bold text-sm">{{ user?.name }}</h1>
        <NuxtLink
          to="/edit-account"
          class="w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
        >
          Edit
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center w-full space-y-3">
        <div v-for="link in links" :key="link.name" class="w-full">
          <NuxtLink
            :to="link.link"
            :class="`flex flex-row items-center justify-start w-full px-5 py-3 space-x-2 rounded-xl ${ route.path === link.link ? 'bg-accent-4' : 'bg-none' } hover:bg-accent-4 transition ease-in-out duration-200`"
          >
            <svg v-if="link.name === 'Dashboard'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
            </svg>
            <svg v-if="link.name === 'Projects'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"></path>
            </svg>
            <svg v-if="link.name === 'Blogs'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path>
            </svg>
            <svg v-if="link.name === 'Admin Users'" class="w-5 h-5 text-accent-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
            </svg>
            <span>{{ link.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center w-full">
      <button
        :disabled="isLoading"
        type="button"
        :class="`w-auto px-5 py-1 rounded-full border border-accent-4 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`"
        v-on:click="handleLogout"
      >
        {{ isLoading ? 'Loading...' : 'Logout' }}
      </button>
    </div>
  </div>
</template>