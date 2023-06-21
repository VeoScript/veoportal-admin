<script setup lang="ts">
const router = useRouter()
router.push('/')

// auto detect if the user is logged in (using nuxt3 middleware)...
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Loading...'
})
</script>