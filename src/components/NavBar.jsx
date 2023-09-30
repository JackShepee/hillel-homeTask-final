import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import logo from "../../public/assets/logo.svg";
import { useSelector } from "react-redux";

const NavBar = () => {
  const cartItems = useSelector((state) => state.smoothie.cart);

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
        <div className="relative">
          <NavLink to="/cart">
            <ShoppingCartIcon className="h-6 w-6 text-white hover:text-gray-400" />
            {cartItems.length > 0 && (
              <span className="absolute top-[-12px] right-[-12px] bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
