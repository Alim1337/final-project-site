import React from 'react'
import Image from 'next/image'

function MediumCard({ img, title }) {
  return (
    <div className='cursor-pointer hover:scale-125 
    transform transition duration-300 ease-out bg-white'> 
      <div className='relative h-80 w-80'>
        <Image src={img} layout="fill" className='rounded-xl' />
      </div>
      <h3 className='text-2xl mt-3 font-mono text-black'> 
        {title}
      </h3>  
    </div>
  )
}

export default MediumCard
