import prisma from "~/composables/prisma";

interface IBlog {
  photo: string
  title: string
  topic: string
  article: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<IBlog>(event)

  const createBlog = await prisma.blog.create({
    data: {
      image: body.photo,
      title: body.title,
      topic: body.topic,
      article: body.article,
    }
  })

  return createBlog
})