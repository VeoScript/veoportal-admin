import { Prisma } from "@prisma/client";
import prisma from "~/composables/prisma";
import * as bcrypt from "bcrypt";

interface IUser {
  photo: string
  name: string
  username: string
  email: string
  password: string
}

const roundsOfHashing = 10;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<IUser>(event)

    const hashedPassword = await bcrypt.hash(body.password, roundsOfHashing);

    const createUser = await prisma.user.create({
      data: {
        image: body.photo,
        name: body.name,
        username: body.username,
        email: body.email,
        password: hashedPassword,
      }
    })

    return createUser
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 - is prisma error code for unique constraint violation...
      if (error.code === 'P2002') {
        throw createError({ fatal: true, statusMessage: "This account is not available." })
      }
    }
  }
})