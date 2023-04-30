import React from 'react'
import Image from 'next/image'
import {SearchIcon,
         GlobeAltIcon , 
         MenuIcon , 
         UserCircleIcon ,
         UsersIcon ,
        } from "@heroicons/react/solid"

function Header() {
  return (
    <header className='sticky top-0 z-50 
    grid
     grid-cols-3
      bg-white shadow-md py-5 px-5 md:px-10'>
      {/* LEFT SECTION */}

      <div className='relative flex items-center h-20
      cursor-pointer my-auto'>
        <Image
          src="https://img.freepik.com/free-vector/real-estate-business-logo-template-branding-design-vector-haus-estate-company-text_53876-136241.jpg?w=900&t=st=1682041935~exp=1682042535~hmac=d5e8f8d5476c7c1567f1ad4c589bf45badc2d149e2a5e16203d83e634b1b2283"
          layout = "fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {/* MIDDLE SECTION SEARCH BAR */}
      <div className='flex items-center 
      md:border-2 rounded-full py-2
      md:shadow-sm'>
        <input className='flex-grow pl-11 bg-transparent outline-none
       text-sm text-gray-600 placeholder-gray-400' type='text' placeholder='Start'/>
        <SearchIcon className ="hidden md:inline-flex
        h-8 bg-red-400 text-white rounded-full
        p-2 cursor-pointer md:mx-2"/>
      </div>
      {/* RIGHT SECTION */}
      <div className='flex items-center 
      space-x-4 justify-end text-gray-500'>
        <p className='hidden md:inline-flex cursor-pointer'>Devenir un locataire</p>
        <GlobeAltIcon className='h-6'/>
        <div className='flex items-center space-x-2 border-2 p-2
        rounded-full'>
        <MenuIcon className='h-6 cursor-pointer' />
        <UserCircleIcon className='h-6 cursor-pointer'/>

        </div>
      </div>
    </header>
  )
}

export default Header
