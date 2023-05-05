import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
          src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-house-icon-png-image_4013530.jpg"
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
        <Link href="signup">
        <button className="text-red-500 bg-white border border-red-100 px-8 py-4 font-mono
        shadow-md rounded-full font-bold my-3
        hover:shadow-2xl active:scale-90
        transition duration-150">Devenir Un Client</button>
   
          </Link>
        <GlobeAltIcon className='h-6'/>
        <div className='flex items-center space-x-2 border-2 p-2
        rounded-full'>
        <MenuIcon className='h-6 cursor-pointer' />
        <UserCircleIcon className='h-6 cursor-pointer'/>
        <Link href="/signup">
        <div className='h-6 cursor-pointer'></div>
        </Link>

        </div>
      </div>
    </header>
  )
}

export default Header
