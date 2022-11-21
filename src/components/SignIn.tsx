import { signIn, signOut, useSession } from 'next-auth/react';

export const SignIn: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="rounded-full bg-black px-10 py-3 font-semibold text-white transition hover:bg-gray-600"
      onClick={sessionData ? () => signOut() : () => signIn()}
    >
      {sessionData ? 'Sign out' : 'Sign in'}
    </button>
  );
};
