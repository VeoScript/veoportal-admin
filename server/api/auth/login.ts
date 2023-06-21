import { useSession } from '~/utils/session';
import errorResponse from '~/utils/error-response'
import prisma from "~/composables/prisma";
import * as bcrypt from "bcrypt";

interface ILogin {
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  const session = await useSession(event);

  const body = await readBody<ILogin>(event)

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    },
    select: {
      id: true,
      password: true,
    }
  })

  if (!user) {
    return errorResponse(event, { statusCode: 400, statusMessage: 'Account not found!' })
  }

  const hashedPassword = await bcrypt.compare(body.password, user.password);

  if (!hashedPassword) {
    return errorResponse(event, { statusCode: 400, statusMessage: 'Password is incorrect!' })
  }

  session.user = {
    id: user.id,
  };

  await session.save();

  return 'Logged in successfully!'
})