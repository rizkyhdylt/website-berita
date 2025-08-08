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

const Sidebar = () => {
  const { pathname } = useLocation();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
    localStorage.removeItem("newsToken");
    dispatch({ type: "logout", payload: "" });
    window.location.href = "http://localhost:3000?logout=true";
  };

  const role = store.userInfo?.role || "user";
  const items = menuItems[role] || menuItems.user;

  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white shadow-lg flex flex-col">
      {/* Logo Area */}
      <div className="h-[70px] flex justify-center items-center border-b border-gray-200 shadow-sm">
        <Link to="http://localhost:3000">
          <img className="w-[180px] h-[80px] object-contain" src={logo} alt="Jateng Updates" />
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
  );
};

export default Sidebar;
