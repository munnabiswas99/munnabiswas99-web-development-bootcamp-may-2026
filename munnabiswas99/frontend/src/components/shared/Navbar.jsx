import React from "react";
import Logo from "../logo/Logo";
import { NavLink } from "react-router";

const Navbar = () => {
    
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
    <div className="flex justify-between items-center py-2">
      <Logo></Logo>
      <ul className="flex gap-10">{links}</ul>
      <div className="flex gap-2">
        <NavLink className='rounded px-3 py-1 text-primary-text bg-mist-600'>SignIn</NavLink>
        <NavLink className='rounded px-3 py-1 text-secondary-text bg-white'>SignUp</NavLink> 
      </div>
    </div>
  );
};

export default Navbar;
