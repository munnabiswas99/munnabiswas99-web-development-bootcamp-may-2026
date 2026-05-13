import React, { useState } from "react";
import { NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoWallet } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import Logo from "../logo/Logo";
import useAuth from "../../hooks/useAuth";
import { GiCancel } from "react-icons/gi";
import { AiOutlineMenu } from "react-icons/ai";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User Logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const links = (
    <>
      <li className="rounded-xl hover:bg-gray-300 px-3 py-1">
        <NavLink to="/dashboard" className="flex items-center gap-2 text-lg">
          <MdDashboard /> Dashboard
        </NavLink>
      </li>
      <li className="hover:bg-auto rounded-xl hover:bg-gray-300 px-3 py-1">
        <NavLink to="/dashboard/transactions" className="flex items-center gap-2 text-lg">
          <GrTransaction /> Transactions
        </NavLink>
      </li>
      <li className="hover:bg-auto rounded-xl hover:bg-gray-300 px-3 py-1">
        <NavLink to="/wallet" className="flex items-center gap-2 text-lg">
          <IoWallet /> Wallet
        </NavLink>
      </li>
      <li className="hover:bg-auto rounded-xl hover:bg-gray-300 px-3 py-1">
        <NavLink to="/setting" className="flex items-center gap-2 text-lg">
          <IoMdSettings /> Settings
        </NavLink>
      </li>
      <div className="flex items-center justify-start mt-30 gap-2">
        <NavLink>
          <img
            className="rounded-full w-10 h-10 object-cover"
            src={user.photoURL}
            alt="profile"
          />
        </NavLink>

        <button
          onClick={handleLogout}
          className="rounded px-3 py-2 text-secondary-text bg-gray-300 hover:bg-gray-400 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </>
  );
  return (
    <div className="p-6">
      <div className="flex justify-between items-center gap-20 md:hidden">
        <div className="bg-background rounded-2xl p-1">
          <Logo />
        </div>

        <button onClick={() => setOpen(!open)} className="text-3xl">
          {open ? <GiCancel /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block border-r-2 border-gray-300 pr-5">
        <div className="bg-background rounded-2xl p-1">
          <Logo />
        </div>

        <ul className="space-y-4 mt-10">{links}</ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-20 h-screen w-72 bg-white shadow-2xl p-6 transition-transform duration-300 rounded-xl md:hidden ${
          open ? "translate-y-2 -translate-x-2" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center mb-10">
          <button onClick={() => setOpen(false)} className="text-3xl">
            <GiCancel />
          </button>
        </div>

        <ul className="space-y-4">{links}</ul>
      </div>
    </div>
  );
};

export default SideBar;
