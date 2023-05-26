import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid";
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

function Header() {
  const [proprietaireName, setProprietaireName] = useState('');
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.nom) {
        setProprietaireName(decodedToken.nom);
        setShowDisconnectButton(true);
      }
    }
  }, []);

  const router = useRouter();
  const [searchInput, setSearchInput] = useState("")
  const { modeReq } = router.query
  const [mode, setMode] = useState(modeReq)

  const handleConnexionClick = () => {
    router.push('/login_client');
    setShowDisconnectButton(false);
  };

  const handleSignupClick = () => {
    router.push('/signup_client');
    setShowDisconnectButton(false);
  };

  const handleDisconnectClick = () => {
    localStorage.removeItem('token');
    setProprietaireName('');
    setShowDisconnectButton(false);
  };

  return (
    <header className='sticky top-0 z-40 grid grid-cols-3 bg-white shadow-md py-3 px-3 md:px-10'>
      {/* LEFT SECTION */}
      <div onClick={() => router.push({ pathname: "/", mode: true })} className='relative flex items-center h-16 my-auto'>
        <Image
          src="https://img.freepik.com/free-vector/real-estate-business-logo-template-branding-design-vector-haus-estate-company-text_53876-136241.jpg?w=900&t=st=1682041935~exp=1682042535~hmac=d5e8f8d5476c7c1567f1ad4c589bf45badc2d149e2a5e16203d83e634b1b2283"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          className='cursor-pointer'
        />
      </div>
      {/* MIDDLE SECTION SEARCH BAR */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='flex-grow pl-11 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
          type='text'
          placeholder='Rechercher'
        />
        <SearchIcon
          onClick={() => router.push({ pathname: "homesList", query: { location: "Stays In " + searchInput } })}
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
        />
      </div>
      {/* RIGHT SECTION */}
      <div className='flex items-center space-x-4 justify-end text-gray-500'>
        {showDisconnectButton ? (
          <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
            <h1>{proprietaireName}</h1>
            <UserCircleIcon className='h-6 cursor-pointer' />
            <MenuIcon className='h-6 cursor-pointer' />
            <button
              className="text-red-500 flex-auto bg-white border border-red-100 px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
              onClick={handleDisconnectClick}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              className="text-red-500 flex-auto bg-white border border-red-100 px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
              onClick={handleConnexionClick}
            >
              Connexion
            </button>
            <button
              className="text-red-500 flex-auto bg-white border border-red-100 px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
              onClick={handleSignupClick}
            >
              Signup
            </button>
          </div>
        )}
        <GlobeAltIcon className='h-6' />
      </div>
    </header>
  )
}

export default Header;
