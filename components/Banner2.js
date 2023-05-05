import React from 'react'
import Image from 'next/image'
function Banner2() {
  return (
    <div className='relative h-[300px] sm:h-[400px] bg-white
    lg:h-[500px] xl:h-[600px] 2xl:h-[700px] '>
        <Image src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        layout ="fill"
        objectFit='cover' />
    
    </div>
  )
}

export default Banner2

