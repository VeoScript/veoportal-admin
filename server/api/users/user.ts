import { useSession } from "~/utils/session";
import prisma from "~/composables/prisma";

export default defineEventHandler(async (event) => {
  const session = await useSession(event);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  return user;
});
