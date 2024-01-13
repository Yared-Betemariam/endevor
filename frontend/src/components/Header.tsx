import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-gray-900 py-6">
      <div className=" container flex mx-auto justify-between items-center">
        <Link
          to="/"
          className="text-3xl text-rose-600 font-bold tracking-tight font-jost"
        >
          Endevor
        </Link>
        {isLoggedIn ? (
          <div className="flex gap-6 items-center">
            <Link to="my-posts">My Posts</Link>
            <SignOutButton />
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="rounded-full px-7 py-3 bg-red-700 text-white shadow-md hover:opacity-90 transition-all ease-in-out active:scale-105 bg-opacity-80 font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
