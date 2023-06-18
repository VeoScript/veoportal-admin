<script setup lang="ts">
defineProps({
  message: {
    type: String,
    require: true
  }
})
</script>

<template>
  <h3 class="font-bold text-base">There is no {{ message }} as of now</h3>
</template>