import prisma from "../../../composables/prisma";

export default defineEventHandler(async (event) => {
  const countProjects = await prisma.projects.count()
  return countProjects
})