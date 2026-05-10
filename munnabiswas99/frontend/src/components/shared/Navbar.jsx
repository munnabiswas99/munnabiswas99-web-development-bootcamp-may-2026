import { useState } from "react";
import Logo from "../logo/Logo";
import { GiCancel } from "react-icons/gi";
import { AiOutlineMenuFold } from "react-icons/ai";
import { NavLink } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <li className="rounded-xl hover:bg-gray-900 px-3 py-1">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:bg-auto rounded-xl hover:bg-gray-900 px-3 py-1">
        <NavLink to="/coverage">Features</NavLink>
      </li>
      <li className="hover:bg-auto rounded-xl hover:bg-gray-900 px-3 py-1">
        <NavLink to="/sendParcel">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="my-2 rounded-xl shadow shadow-gray-950">
      {/* Desktop Menu */}
      <div className="flex justify-between p-3">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Logo></Logo>
          <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">
            {open ? <GiCancel /> : <AiOutlineMenuFold />}
          </button>
        </div>
        <div>
          <ul className="hidden md:flex">{links}</ul>
        </div>
        <div className="hidden md:flex gap-2">
          <NavLink
            to="/login"
            className="rounded px-3 py-1 text-primary-text bg-mist-600"
          >
            SignIn
          </NavLink>
          <NavLink
            to="/register"
            className="rounded px-3 py-1 text-secondary-text bg-white"
          >
            SignUp
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-1/2 w-64 bg-black/40 backdrop-blur-md rounded-xl text-white p-5 transition-transform duration-300 md:hidden ${
          open ? "translate-y-2 -translate-x-2" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button onClick={() => setOpen(false)} className="text-3xl mb-10">
            <GiCancel />
          </button>
        </div>

        <ul className="flex flex-col gap-5">{links}</ul>

        <div className="flex gap-3 mt-10">
          <NavLink className="rounded px-3 py-1 text-primary-text bg-mist-600">
            SignIn
          </NavLink>

          <NavLink className="rounded px-3 py-1 text-secondary-text bg-white">
            SignUp
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
