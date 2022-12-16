import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SignIn } from './SignIn';

const Navbar = () => {
  const { data } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2 mx-10 flex items-center justify-between">
      <Link href="/" className="text-2xl">
        Bird App
      </Link>
      <div className="flex flex-col items-end">
        <Image
          src={data?.user?.image ?? '/favicon.ico'}
          className="cursor-pointer rounded-full"
          width={40}
          height={40}
          alt="The current user's profile picture"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="fixed mt-12 flex flex-col overflow-hidden rounded-md bg-gray-900">
            {data?.user && (
              <Link
                href="/profile"
                className="w-28 text-center hover:bg-gray-600"
              >
                Profile
              </Link>
            )}
            <SignIn className="w-28 hover:bg-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
