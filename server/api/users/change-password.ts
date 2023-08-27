import { useSession } from "~/utils/session";
import prisma from "~/composables/prisma";
import * as bcrypt from "bcrypt";

interface IUser {
  old_password: string;
  new_password: string;
}

const roundsOfHashing = 10;

export default defineEventHandler(async (event) => {
  const session = await useSession(event);

  const body = await readBody<IUser>(event);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      password: true,
    },
  });

  const hashedPassword =
    user && (await bcrypt.compare(body.old_password, user.password));

  if (!hashedPassword) {
    return {
      status: 401,
      error: "Old password is incorrect!",
      data: {},
    };
  }

  const hashedNewPassword = await bcrypt.hash(body.new_password, roundsOfHashing);

  const editUser = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return {
    status: 200,
    error: "",
    data: editUser,
  };
});
