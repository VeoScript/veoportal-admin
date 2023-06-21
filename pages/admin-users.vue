<script setup lang="ts">
const { data: users, pending, refresh: refreshUsers } = useLazyFetch('/api/users')

// auto detect if the user is logged in (using nuxt3 middleware)...
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: "Admin Users"
})
</script>

<template>
  <NuxtLayout>
    <div class="flex-1 w-full overflow-y-auto">
      <TopBar title="Admin Users" />
      <div v-if="pending" class="flex flex-col items-center w-full p-10">
        <Loader />
      </div>
      <div v-else-if="users?.length === 0" class="flex flex-col items-center w-full p-10">
        <Empty message="users" />
      </div>
      <table v-else class="w-full border-collapse border border-accent-4 p-3">
        <thead>
          <tr>
            <th class="border border-accent-4 p-3 bg-accent-4 cursor-default">Profile</th>
            <th class="border border-accent-4 p-3 bg-accent-4 cursor-default">Name</th>
            <th class="border border-accent-4 p-3 bg-accent-4 cursor-default">Username</th>
            <th class="border border-accent-4 p-3 bg-accent-4 cursor-default">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border border-accent-4 w-[15vh] h-[15vh]">
              <NuxtImg
                preload
                class="w-full h-full object-cover bg-accent-4"
                :src="`${user.image ?? '/images/placeholder.png'}`"
                alt="User Image"
              />  
            </td>
            <td class="border border-accent-4 p-3">{{ user.name }}</td>
            <td class="border border-accent-4 p-3">{{ user.username }}</td>
            <td class="border border-accent-4 p-3">{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>