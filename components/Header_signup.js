import React from 'react'
import Image from 'next/image'
import { 
  MagnifyingGlassIcon,
  GlobeAltIcon, 
  Bars3Icon, 
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid"

function Header_signup() {
  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-0 px-2 md:px-10'>
      {/* LEFT SECTION */}
      <div className='relative flex items-center h-20 cursor-pointer my-auto'>
        <Image
          src="https://img.freepik.com/..."
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* MIDDLE SECTION SEARCH BAR */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input
          className='flex-grow pl-11 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
          type='text'
          placeholder='Start'
        />
        <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      {/* RIGHT SECTION */}
      <div className='flex items-center space-x-4 justify-end text-gray-500'>
        <GlobeAltIcon className='h-6' />
        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <Bars3Icon className='h-6 cursor-pointer' />
          <UserCircleIcon className='h-6 cursor-pointer' />
        </div>
      </div>
    </header>
  )
}

export default Header_signup