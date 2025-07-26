import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/JATENGUPDATES.png";
import {AiFillDashboard,AiOutlinePlus,} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import storeContext from "../../context/storeContext";

const menuItems = {
  admin: [
    {
      to: "/dashboard/admin",
      icon: <AiFillDashboard />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/writer/add",
      icon: <AiOutlinePlus />,
      label: "Add Writer",
    },
    {
      to: "/dashboard/writers",
      icon: <ImProfile />,
      label: "Writers",
    },
    {
      to: "/dashboard/iklan",
      icon: <RiAdvertisementLine />,
      label: "Iklan",
    },
    {
      to: "/dashboard/news",
      icon: <BiNews />,
      label: "News",
    },
    {
      to: "/dashboard/profile",
      icon: <FiUser />,
      label: "Profile",
    },
    {
      to: "/dashboard/user",
      icon: <FiUser />,
      label: "Users",
    }
  ],
  writer: [
    {
      to: "/dashboard/writer",
      icon: <AiFillDashboard />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/news/create",
      icon: <FaPlus />,
      label: "Add News",
    },
    {
      to: "/dashboard/news",
      icon: <BiNews />,
      label: "News",
    },
    {
      to: "/dashboard/profile",
      icon: <FiUser />,
      label: "Profile",
    },
  ],
  user: [
    {
      to: "/dashboard/profile",
      icon: <FiUser />,
      label: "Profile",
    },
  ],
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { store, dispatch } = useContext(storeContext);

  const logout = () => {
  // Hapus token dari local tab
  localStorage.removeItem("newsToken");


  // Update state global (misalnya context/reducer)
  dispatch({ type: "logout", payload: "" });

  // Redirect ke app utama di localhost:3000
  window.location.href = "http://localhost:3000?logout=true";
};

  const role = store.userInfo?.role || "user";
  const items = menuItems[role] || menuItems.user;

  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-white">
      <div className="h-[70px] flex justify-center items-center">
        <Link to="http://localhost:3000">
          <img
            className="w-[190px] h-[90px]"
            src={logo}
            alt="Jateng Updates"
          />
        </Link>
      </div>
      <ul className="px-3 flex flex-col gap-y-1 font-medium">
        {items.map(({ to, icon, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`px-3 ${
                pathname === to
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-[#404040f6]"
              } py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white`}
            >
              <span className="icon">{icon}</span>
              <span>{label}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            onClick={logout}
            to="/login"
            className="px-3 py-2 hover:shadow-lg hover:shadow-red-500/20 w-full rounded-sm flex gap-x-2 justify-start items-center hover:bg-red-500 hover:text-white cursor-pointer border-none bg-transparent"
          >
            <span className="icon">
              <IoLogOutOutline />
            </span>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
