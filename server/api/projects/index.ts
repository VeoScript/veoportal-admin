import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const projects = await prisma.projects.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return projects
})