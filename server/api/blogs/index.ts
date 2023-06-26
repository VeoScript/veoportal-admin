import prisma from "../../../composables/prisma";

export default defineEventHandler(async (event) => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return blogs
})