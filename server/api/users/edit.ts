import { useSession } from "~/utils/session";
import prisma from "~/composables/prisma";

interface IUser {
  photo: string;
  name: string;
  username: string;
}

export default defineEventHandler(async (event) => {
  const session = await useSession(event);

  const body = await readBody<IUser>(event);

  // const checkUser = await prisma.user.findFirst({
  //   where: {
  //     username: body.username
  //   },
  // });

  // if (checkUser) {
  //   return {
  //     status: 401,
  //     error: 'Username is not available',
  //     data: {},
  //   }
  // }

  const editUser = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      image: body.photo,
      name: body.name,
      username: body.username,
    },
  });

  return {
    status: 200,
    error: '',
    data: editUser
  };
});
