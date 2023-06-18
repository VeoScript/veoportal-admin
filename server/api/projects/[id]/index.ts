import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const project = await prisma.projects.findFirst({
    where: {
      id
    }
  })
  return project
})