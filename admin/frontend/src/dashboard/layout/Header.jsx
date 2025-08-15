import React, { useContext, useEffect, useState } from 'react';
import storeContext from '../../context/storeContext';
import { IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
import { base_url } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { store } = useContext(storeContext);
  const name = store.userInfo?.name || 'Pengguna';
  const role = store.userInfo?.role || 'user';
  const token = typeof window !== "undefined" ? localStorage.getItem("newsToken") : null;
  const navigate = useNavigate();
  
  const [notifList, setNotifList] = useState([]);
  const [unreadList, setUnreadList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Ambil semua opini dari database
  const fetchNotifList = async () => {
    try {
    const res = await axios.get(`${base_url}/api/opini/list`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // console.log("Daftar opini:", res.data);
    setNotifList(res.data || []);
  } catch (err) {
    console.error("Gagal fetch list opini:", err.response?.data || err.message);
    setNotifList([]);
  }
};

  // Ambil opini yang belum dibaca
  const fetchUnread = async () => {
    try {
      const res = await axios.get(`${base_url}/api/opini/unread`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadList(res.data || []);
    } catch (err) {
      console.error("Gagal fetch opini unread", err);
      setUnreadList([]);
    }
  };

  // Saat pertama kali load
  useEffect(() => {
    if (role === 'admin' || role === 'writer') {
      fetchUnread();
      fetchNotifList();

      // Auto refresh setiap 10 detik
      const interval = setInterval(() => {
        fetchUnread();
        fetchNotifList();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [role]);

  const handleClickNotif = async (opiniId) => {
    try {
      // Tandai sudah dibaca
      await axios.patch(`${base_url}/api/opini/${opiniId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Redirect ke halaman opini
      navigate(`/opini/${opiniId}`);
    } catch (err) {
      console.error("Gagal update status opini", err);
    }
  };

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  let greeting = '';
  if (role === 'admin') {
    greeting = `Selamat datang Admin ${name}, semoga harimu produktif!`;
  } else if (role === 'writer') {
    greeting = `Halo Penulis ${name}, siap update berita terbaru hari ini?`;
  } else {
    greeting = `Selamat datang ${name}, nikmati berita menarik dari Jatengupdates!`;
  }

  return (
    <div className="pl-4 fixed w-[calc(100vw-250px)] top-4 z-50">
      <div className="w-full rounded-lg h-[70px] flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-base md:text-lg font-medium animate-fadeIn">{greeting}</h1>

        <div className="mr-4 flex gap-x-3 items-center relative">
  {/* Lonceng Notifikasi (hanya untuk admin) */}
  {role === 'admin' && (
    <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
      <IoIosNotificationsOutline className="text-2xl text-gray-600 hover:text-gray-800 transition-colors duration-200" />
      {unreadList.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
          {unreadList.length}
        </span>
      )}

      {/* Dropdown Notifikasi */}
      {showDropdown && (
        <div className="absolute top-10 right-0 w-72 bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
          {notifList.length === 0 ? (
            <p className="p-3 text-sm text-gray-500">Tidak ada opini</p>
          ) : (
            notifList.map((opini) => (
              <div
                key={opini._id}
                className="p-3 text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                onClick={() => handleClickNotif(opini._id)}
              >
                <p className="font-semibold">{opini.judul}</p>
                <p className="text-xs text-gray-500">{opini.nama}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )}

  <div className="flex flex-col justify-center items-end">
    <span className="font-semibold">{name}</span>
    <span className="capitalize text-sm text-gray-500">{role}</span>
  </div>

  {store.userInfo?.image && store.userInfo.image !== "null" && store.userInfo.image !== "" ? (
    <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
      <img className="w-full h-full rounded-full object-cover" src={store.userInfo.image} alt="profile" />
    </div>
  ) : (
    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
      {getInitials(name)}
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default Header;
