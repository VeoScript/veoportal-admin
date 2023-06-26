import prisma from "../../../composables/prisma";

export default defineEventHandler(async (event) => {
  const countUsers = await prisma.user.count()
  return countUsers
})