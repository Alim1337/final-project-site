import React from 'react'
import { FiArrowLeft, FiChevronLeft, FiTag, FiSettings, FiHome ,FiPlus, FiUserPlus} from 'react-icons/fi';
import { useState } from 'react';

function SideBar() {
    const [open, setOpen] = useState(true);
    const menus = [
        { title: 'Gestion de profil', icon: FiArrowLeft },
        { title: 'Gestion des annonces', icon: FiTag },
        { title: 'Gestion des biens', icon: FiHome },
        { title: 'Devenir VIP', icon: FiUserPlus },
        { title: 'settings', icon: FiSettings },
    ];
  return (
    <div>
        <div className={`${open ? 'w-60' : 'w-20'} h-screen relative bg-red-400`}>
            <FiChevronLeft
              className={`absolute bg-red-400 border-red-400 rounded-full h-7 cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple transition transform duration-300 ease-out ${
                open ? 'rotate-180' : ''
              }`}
              onClick={() => setOpen(!open)}
            />

            <ul className={`gap-x-4 space-y-3 pt-6 origin-left font-medium text-xl duration-300`}>
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className={`rounded-full text-gray hover:border bg-red-500 bg-opacity-0 hover:bg-opacity-70 border-opacity-70  border-red-500 active:scale-95 text-s flex items-center gap-x-4 cursor-pointer p-2 ${
                    !open ? 'transform scaleX(0)' : ''
                  } transition transform duration-300 ease-out`}
                >
                  {React.createElement(menu.icon, { className: 'text-white' })}
                  <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>
                    {menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
    </div>
  )
}

export default SideBar
