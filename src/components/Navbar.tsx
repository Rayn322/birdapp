import { SignIn } from './SignIn';

const Navbar = () => {
  return (
    <div className="my-2 mx-10 flex items-center justify-between">
      <h1 className="text-2xl">Bird App</h1>
      <SignIn />
    </div>
  );
};

export default Navbar;
