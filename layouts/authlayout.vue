<template>
  <div class="flex flex-col items-center justify-center w-full h-screen font-poppins text-accent-2 bg-accent-3">
    <div class="flex flex-col items-center w-full max-w-xl space-y-10">
      <div class="flex flex-col items-center w-full space-y-2">
        <NuxtImg
          preload
          class="w-20"
          src="/images/veo.png"
          alt="Veoscript Logo"
        />
        <h1>VEOPORTAL (ADMIN PANEL)</h1>
      </div>
      <slot />
    </div>
  </div>
</template>
