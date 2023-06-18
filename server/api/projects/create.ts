import prisma from "../../../composables/prisma";

interface IProjects {
  photo: string
  title: string
  description: string
  sourceCode: string
  demoUrl: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<IProjects>(event)

  const createProject = await prisma.projects.create({
    data: {
      image: body.photo,
      title: body.title,
      description: body.description,
      sourceCode: body.sourceCode,
      demoUrl: body.demoUrl,
    }
  })

  return createProject
})