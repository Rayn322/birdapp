import { signIn, signOut, useSession } from 'next-auth/react';

export const SignIn: React.FC<{ className: string }> = ({ className }) => {
  const { data: sessionData } = useSession();

  return (
    <button
      onClick={sessionData ? () => signOut() : () => signIn()}
      className={className}
    >
      {sessionData ? 'Sign out' : 'Sign in'}
    </button>
  );
};
