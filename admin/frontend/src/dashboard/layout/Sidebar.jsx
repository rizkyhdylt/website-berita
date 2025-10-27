import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/JATENGUPDATES.png";
import {
  AiFillDashboard,
  AiOutlinePlus,
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import storeContext from "../../context/storeContext";

const menuItems = {
  admin: [
    { to: "/dashboard/admin", icon: <AiFillDashboard />, label: "Dashboard" },
    { to: "/dashboard/writer/add", icon: <AiOutlinePlus />, label: "Add Writer" },
    { to: "/dashboard/writers", icon: <ImProfile />, label: "Writers" },
    { to: "/dashboard/iklan", icon: <RiAdvertisementLine />, label: "Iklan" },
    { to: "/dashboard/news/create", icon: <FaPlus />, label: "Add News" },
    { to: "/dashboard/news", icon: <BiNews />, label: "News" },
    { to: "/dashboard/profile", icon: <FiUser />, label: "Profile" },
    { to: "/dashboard/user", icon: <FiUser />, label: "Users" },
    { to: "/dashboard/feedback", icon: <BiNews />, label: "Feedback" },
  ],
  writer: [
    { to: "/dashboard/writer", icon: <AiFillDashboard />, label: "Dashboard" },
    { to: "/dashboard/news/create", icon: <FaPlus />, label: "Add News" },
    { to: "/dashboard/news", icon: <BiNews />, label: "News" },
    { to: "/dashboard/profile", icon: <FiUser />, label: "Profile" },
  ],
  user: [{ to: "/dashboard/profile", icon: <FiUser />, label: "Profile" }],
};

const Sidebar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
    localStorage.removeItem("newsToken");
    dispatch({ type: "logout", payload: "" });
    window.location.href = "/";
  };

  const role = store.userInfo?.role || "user";
  const items = menuItems[role] || menuItems.user;

  return (
    <>
      {/* Overlay untuk HP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[250px] bg-white shadow-lg flex flex-col z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-[70px] flex justify-center items-center border-b border-gray-200 shadow-sm">
          <Link to="localhost:3000">
            <img
              className="w-[180px] h-[80px] object-contain"
              src={logo}
              alt="Jateng Updates"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {items.map(({ to, icon, label }) => {
            const isActive = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setOpen(false)} // otomatis close di HP
                  className={`flex items-center gap-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center gap-x-3 px-4 py-2 w-full rounded-lg text-red-600 font-medium hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <IoLogOutOutline className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
