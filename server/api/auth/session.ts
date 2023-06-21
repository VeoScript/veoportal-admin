import { useSession } from '~/utils/session';

export default eventHandler(async (event) => {
  const session = await useSession(event);
  return session;
});
