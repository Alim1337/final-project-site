import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

function Banner() {
  
  const router = useRouter();
  return (
    <div className='relative h-[300px] sm:h-[400px] bg-white
    lg:h-[500px] xl:h-[600px] 2xl:h-[700px] '>
        <Image src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        layout ="fill"
        objectFit='cover' />
      <div className='absolute top-1/2 w-full text-center'>
        <p className='font-medium sm:text-lg text-red-500 text-2xl lg:text-3xl '>
        Vous ne savez pas où aller ?        </p>
        <button onClick={() => router.push({
          pathname : "homesList",
          query : {
            location : "Discover"
          }})}
        className='text-red-500 bg-white px-8 py-4 font-medium 
        shadow-md rounded-full my-3
        hover:shadow-2xl active:scale-90
        transition duration-150
        '>
            Découvrir</button>
      </div>
    </div>
  )
}

export default Banner