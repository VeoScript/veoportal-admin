import prisma from "~/composables/prisma";

interface IBlog {
  photo: string
  title: string
  topic: string
  article: string
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody<IBlog>(event)

  const updateBlog = await prisma.blog.update({
    where: {
      id
    },
    data: {
      image: body.photo,
      title: body.title,
      topic: body.topic,
      article: body.article,
    }
  })

  return updateBlog
})