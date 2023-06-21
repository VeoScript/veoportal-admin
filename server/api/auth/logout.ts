import { useSession } from '~/utils/session';

export default eventHandler(async (event) => {
  const session = await useSession(event);
  await session.destroy();
  return 'Logged out successfully!';
});
