import { PrismaClient  } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const deleteProject = await prisma.projects.delete({
    where: { id }
  })
  return deleteProject
})