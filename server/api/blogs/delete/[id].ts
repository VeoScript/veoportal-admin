import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const deleteBlog = await prisma.blog.delete({
    where: { id }
  })
  return deleteBlog
})