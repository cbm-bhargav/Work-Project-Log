import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const items = useSelector((state) => state.cart);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="w-full mx-auto flex justify-between items-center p-4">
        <span className="text-2xl font-bold text-yellow-400">REDUX STORE</span>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6 text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 text-yellow-400 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 text-yellow-400 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Cart
            </NavLink>

            <NavLink
              to="/wishList"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 pb-0.5 text-yellow-400 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              <FaHeart/>
            </NavLink>
          </nav>

          <div className="flex items-center justify-between bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold">
            <span className="text-xl px-3 py-1"><FaShoppingCart/></span> 
            <span className="px-3 py-1">{items.length}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
