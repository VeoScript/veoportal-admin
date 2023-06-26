import prisma from "../../../composables/prisma";

export default defineEventHandler(async (event) => {
  const countBlogs = await prisma.blog.count()
  return countBlogs
})