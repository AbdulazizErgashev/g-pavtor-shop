import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <main className="bg-slate-700 text-[#7FAD39]">
      <nav className="flex items-center justify-between max-w-[1200px] mx-auto py-5 px-10 md:px-0">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer font-bold text-lg md:text-xl"
        >
          GreenBite
        </h1>
        <ul className="hidden md:flex gap-x-10">
          <li>
            <NavLink
              to="/"
              className="md:flex items-center gap-x-2 cursor-pointer text-lg font-bold"
            >
              Home
              <IoIosHome />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className="md:flex items-center gap-x-2 cursor-pointer text-lg font-bold"
            >
              Cart
              <MdShoppingCart />
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-x-10 md:hidden text-lg">
          <IoIosHome onClick={() => navigate("/")} />
          <MdShoppingCart onClick={() => navigate("/cart")} />
        </div>
      </nav>
    </main>
  );
}
