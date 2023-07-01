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
  'Bordj El Bahri','Bordj El Kiffan','BouroubaBouzareah','Casbah',
  'Chéraga','Dar El Beïda','Dely Ibrahim',
  'Djasr Kasentina','Douera','Draria',
  'El Achour','El Biar','El Hammamet','El Harrach','El Madania',
  'El Marsa','El Mouradia','El Magharia','Hraoua','Hussein-Dey','Hydra',
  'Khraïssia','Kouba','Les Eucalyptus','Mahelma','Mohammadia','Oued Koriche',
  'Oued Smar','Ouled Chebel','Ouled Fayet',
  'Rahmania','Raïs Hamidou','Réghaïa','Rouïba','Saoula',
  
  'Sidi MHamed','Sidi Moussa','Souidania','Staoueli','Tessala El Merdja','Zéralda'];
  const propertyTypeOptions = ['Appartement', 'Villa'];
  const numBedroomsOptions = ['1 Chambre', '2 Chambres', '3 Chambres ', '4 Chambres' , '5 Chambre' , '6 Chambre'
,' 7Chambres','8 Chambres','9 Chambre','10 Chambre','11 Chambres',"12 Chambres"];

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
     
          router.push('/panel');
      
      
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
    <header className='sticky top-0 z-40 grid grid-cols-3 bg-white shadow-md py-3 px-3 md:px-10'>
      {/* LEFT SECTION */}
      <div onClick={() => router.push({ pathname: "/", mode: true })} className='relative flex items-center top-2 h-16 my-auto'>
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://img.uxwing.com/wp-content/themes/uxwing/download/buildings-architecture-real-estate/property-icon.svg" alt="logo" />
          Ekrili
        </a>
      </div>
      {/* MIDDLE SECTION SEARCH BAR */}
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        {/* Location dropdown */}
        <div className="relative">
          <select
            value={searchLocation}
            onChange={(e) => handleLocationSelect(e.target.value)}
            className="flex items-center pl-4 bg-transparent outline-none
             text-sm text-gray-600 placeholder-gray-400"
          >
            {locationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        {/* Adress dropdown */}
        <div className="relative">
          <select
            value={searchadresse}
            onChange={(e) => handleAdressSelect(e.target.value)}
            className="flex items-center pl-4 bg-transparent outline-none 
            text-sm text-gray-600 placeholder-gray-400"
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
            className="flex items-center pl-4 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
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
            className="flex items-center pl-4 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          >
            {numBedroomsOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button
  onClick={handleSearchClick}
  className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer ml-2"
>
  <SearchIcon className="h-6" />
</button>

      </div>
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
              className="text-red-500 flex-auto bg-white border border-red-100 px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
              onClick={handleConnexionClick}
            >
              Connecter
            </button>
            <button
              className="text-red-500 flex-auto bg-white border border-red-100 px-4 py-2 font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
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
