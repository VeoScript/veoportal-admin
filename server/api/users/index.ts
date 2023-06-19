import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany()
  return users
})