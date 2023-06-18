import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const blog = await prisma.blog.findFirst({
    where: {
      id
    }
  })
  return blog
})