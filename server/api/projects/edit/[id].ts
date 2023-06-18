import prisma from "~/composables/prisma";

interface IProjects {
  photo: string
  title: string
  description: string
  sourceCode: string
  demoUrl: string
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody<IProjects>(event)

  const updateProject = await prisma.projects.update({
    where: {
      id
    },
    data: {
      image: body.photo,
      title: body.title,
      description: body.description,
      sourceCode: body.sourceCode,
      demoUrl: body.demoUrl,
      updatedAt: new Date(),
    }
  })
  return updateProject
})