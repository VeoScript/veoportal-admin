export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await useLazyFetch('/api/auth/session', {
    headers: useRequestHeaders(),
  })

  if (!session.value?.user) {
    return navigateTo('/login')
  }
})