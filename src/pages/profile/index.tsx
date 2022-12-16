import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (!data?.user) {
      router.push('/');
    }
  }, [data, router]);

  return (
    <main>
      <h1>Profile</h1>
    </main>
  );
};

export default Profile;
