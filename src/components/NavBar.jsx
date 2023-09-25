import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import logo from "../../public/assets/logo.svg";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <a
            href="/"
            className="text-white font-bold text-lg hover:text-gray-400"
          >
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </a>
        </div>
        <div className="space-x-4 flex gap-[55px]">
          <NavLink to="/" className="text-white hover:text-gray-400">
            Main
          </NavLink>
          <NavLink
            to="/smoothie-constructor"
            className="text-white hover:text-gray-400"
          >
            Smoothie Constructor
          </NavLink>
          <NavLink to="/about-us" className="text-white hover:text-gray-400">
            About Us
          </NavLink>
        </div>
        <div>
          <NavLink to="/cart">
            <ShoppingCartIcon className="h-6 w-6 text-white hover:text-gray-400" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
