import React, { useContext } from 'react';
import profile from '../assets/profile.png';
import storeContext from '../../context/storeContext';

const Header = () => {
  const { store } = useContext(storeContext);
  const name = store.userInfo?.name || 'Pengguna';
  const role = store.userInfo?.role || 'user';

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
      <div className="w-full rounded h-[70px] flex justify-between items-center p-4 bg-white">
        <h1 className="text-base md:text-lg font-medium">{greeting}</h1>

        <div className="mr-4">
          <div className="flex gap-x-2">
            <div className="flex flex-col justify-center items-end">
              <span>{name}</span>
              <span className="capitalize">{role}</span>
            </div>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={store.userInfo?.image || profile}
              alt="profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
