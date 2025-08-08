import React, { useContext } from 'react';
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

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="pl-4 fixed w-[calc(100vw-250px)] top-4 z-50">
      <div className="w-full rounded-lg h-[70px] flex justify-between items-center p-4 bg-white shadow-md">
        {/* Greeting */}
        <h1 className="text-base md:text-lg font-medium animate-fadeIn">
          {greeting}
        </h1>

        {/* Profile Section */}
        <div className="mr-4">
          <div className="flex gap-x-3 items-center">
            <div className="flex flex-col justify-center items-end">
              <span className="font-semibold">{name}</span>
              <span className="capitalize text-sm text-gray-500">{role}</span>
            </div>

            {store.userInfo?.image && store.userInfo.image !== "null" && store.userInfo.image !== "" ? (
              <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={store.userInfo.image}
                  alt="profile"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {getInitials(name)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
