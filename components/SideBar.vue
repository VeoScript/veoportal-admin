<script setup lang="ts">
import { links } from "~/composables/links"
const route = useRoute()
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-[15rem] h-full px-5 py-10 space-y-10 border-r border-neutral-700">
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
        <NuxtImg
          preload
          class="w-20 h-20 rounded-full object-cover"
          src="/images/jeromevillaruel.webp"
          alt="Veoscript"
        />
        <h1 class="font-bold text-sm">Jerome Villaruel</h1>
        <NuxtLink
          to="/"
          class="w-auto px-5 py-1 rounded-full border border-neutral-700 font-light text-xs text-accent-2 transition ease-in-out duration-200 hover:opacity-50"
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
            <svg v-if="link.name === 'Dashboard'" class="w-5 h-5 fill-current text-accent-2" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z" fill-rule="nonzero"/>
            </svg>
            <svg v-if="link.name === 'Projects'" class="w-5 h-5 fill-current text-accent-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 9v-7h7c1.695 1.942 2.371 3 4 3h13v4h-24zm0 2v11h24v-11h-24z"/>
            </svg>
            <svg v-if="link.name === 'Blogs'" class="w-5 h-5 fill-current text-accent-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <svg v-if="link.name === 'Admin Users'" class="w-5 h-5 fill-current text-accent-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.582 5.068 16.097 11 20 5.932-3.903 11-11.418 11-20-3.514 0-8.005-1.005-11-4zm-8.912 5.894c2.455-.246 5.912-1.012 8.912-3.25v18.906c-4-3.063-8.254-8.604-8.912-15.656z"/>
            </svg>
            <span>{{ link.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>