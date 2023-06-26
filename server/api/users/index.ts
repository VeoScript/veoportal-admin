import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return users
})