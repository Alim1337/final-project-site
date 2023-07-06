import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from "@heroicons/react/solid";
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function Header() {
  const [proprietaireName, setProprietaireName] = useState('');
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchadresse, setSearchAdresse] = useState('');
  const [searchPropertyType, setSearchPropertyType] = useState('');
  const [searchNumBedrooms, setSearchNumBedrooms] = useState('');


  const locationOptions = ['Alger'];
  const adresseOptions = ['Aïn Benian','Aïn Taya','Alger-Centre','Baba Hassen','Bab El Oued','Bab Ezzouar',
  'Bachdjerrah','Baraki','Belouizdad','Ben Aknoun','Beni Messous',
  'Birkhadem','Bir Mourad Raïs','Birtouta','Bologhine',
  'Bordj El Bahri','Bordj El Kiffan','Bourouba','Bouzareah','Casbah',
  'Chéraga','Dar El Beïda','Dely Ibrahim',
  'Djasr Kasentina','Douera','Draria',
  'El Achour','El Biar','El Hammamet','El Harrach','El Madania',
  'El Marsa','El Mouradia','El Magharia','Hraoua','Hussein-Dey','Hydra',
  'Khraïssia','Kouba','Les Eucalyptus','Mahelma','Mohammadia','Oued Koriche',
  'Oued Smar','Ouled Chebel','Ouled Fayet',
  'Rahmania','Raïs Hamidou','Réghaïa','Rouïba','Saoula',
  
  'Sidi MHamed','Sidi Moussa','Souidania','Staoueli','Tessala El Merdja','Zéralda'];
  const propertyTypeOptions = ['appartement', 'villa'];
  const numBedroomsOptions = ['F1', 'F2', 'F3 ', 'F4' , 'F5' , 'F6'
,' F7','F8','F9','F10','F11',"F12","F13","F14"];

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
  const [searchInput, setSearchInput] = useState("");
  const { modeReq } = router.query;
  const [mode, setMode] = useState(modeReq);

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
    router.push("/");
  };

  const handleDashboardClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.userType) {
        const userType = decodedToken.userType;
        const statusVIP = decodedToken.statusVIP;
        if (statusVIP) {
          console.log('Redirecting to /Vip');
          router.push('/Vip');
        } else if (userType === 'proprietaire') {
          console.log('Redirecting to /panel');
          router.push('/panel');
        }
        else if (userType ==='client'){
          console.log('Redirecting to /panel')
          router.push('/panel')
        }
      
      }
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogoutClick = () => {
    handleDisconnectClick();
    handleDropdownToggle();
  };

  const handleSupportClick = () => {
    // Add your support functionality here
    handleDropdownToggle();
  };
  const handleSearchClick = () => {
    const queryParams = {
      location: searchLocation || '',
      address: searchadresse || '',
      propertyType: searchPropertyType || '',
      numBedrooms: searchNumBedrooms || '',
    };
  
    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');
  
    const url = `/homesList_filtred?${queryString}`;
  
    // Redirect to the desired URL
    window.location.href = url;
  };
  
  
  
  
  const handleLocationSelect = (location) => {
    setSearchLocation(location);
  };

  const handleAdressSelect = (adress) => {
    setSearchAdresse(adress);
  };

  const handlePropertyTypeSelect = (propertyType) => {
    setSearchPropertyType(propertyType);
  };

  const handleNumBedroomsSelect = (numBedrooms) => {
    setSearchNumBedrooms(numBedrooms);
  };
  
  return (
    <header className='sticky top-0 z-40 grid grid-flow-col bg-white shadow-md py-3 px-3 md:px-10'>
      {/* LEFT SECTION */}
      <div onClick={() => router.push({ pathname: "/", mode: true })} className='relative flex items-center top-2 h-16 my-auto'>
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://img.uxwing.com/wp-content/themes/uxwing/download/buildings-architecture-real-estate/property-icon.svg" alt="logo" />
          E-krili
        </a>
      </div>
      <div className='w-20'></div>
      {/* MIDDLE SECTION SEARCH BAR */}
      <div className="flex items-center px-2 border-2 rounded-full py-2 shadow-sm">
      <div className="hidden sm:block">
        <div className="inset-y-0 left-0 flex items-center pl-3 pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
      </div>
      {/* Location dropdown */}
      <div className="relative">
        <select
          value={searchLocation}
          onChange={(e) => handleLocationSelect(e.target.value)}
          className="z-10 text-black border-opacity-0 bg-white rounded-lg w-32"
        >
          {locationOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Address dropdown */}
      <div className="relative">
        <select
          value={searchadresse}
          onChange={(e) => handleAdressSelect(e.target.value)}
          className="z-10 py-2 text-black border-opacity-0 bg-white rounded-lg w-32 hover:"
        >
          {adresseOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Property type dropdown */}
      <div className="relative">
        <select
          value={searchPropertyType}
          onChange={(e) => handlePropertyTypeSelect(e.target.value)}
          className="z-10 text-black border-opacity-0 bg-white rounded-lg w-32"
        >
          {propertyTypeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Number of bedrooms dropdown */}
      <div className="relative">
        <select
          value={searchNumBedrooms}
          onChange={(e) => handleNumBedroomsSelect(e.target.value)}
          className="z-10 text-black border-opacity-0 bg-white rounded-lg w-32"
        >
          {numBedroomsOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSearchClick} className="bg-white hover:bg-gray-100 text-gray-800 font-medium 
      py-2 px-4 border border-gray-400 rounded-full shadow w-full ">
    
        Recherche
      </button>

      
    </div>

      <div className='w-1'></div>
      {/* RIGHT SECTION */}
      
      <div className='flex items-center space-x-4 justify-end text-gray-500'>
      <GlobeAltIcon className='h-6' />
        {showDisconnectButton ? (
          <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
            <h1 className='pl-2'>{proprietaireName}</h1>
            <UserCircleIcon className='h-6 cursor-pointer' />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
                  <MenuIcon className='h-6 cursor-pointer' />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleDashboardClick}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        >
                          DashBoard      
                        </button>             
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm`}
                        >
                          License
                        </a>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleDisconnectClick}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button
              className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
              onClick={handleConnexionClick}
            >
              Connecter
            </button>
            <button
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              onClick={handleSignupClick}
            >
              Créer un compte
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
