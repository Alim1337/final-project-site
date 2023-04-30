import React from 'react'
import Image from 'next/image'


function LargeCard( {img,title,description,buttonText}) {
  return (
    <section className ='relative py-60 cursor-pointer bg-white' >
        <div className="relative h-96 min-w-[300px]">
        <Image src={img} 
        layout ="fill"
        objectFit='cover'
        className='rounded-2xl'
        />
</div>

<div className='absolute top-80 left-40'>
<h3 className='text-4xl font-mono mb-3 w-64  text-black'>{title}
</h3>
<p className='text-black font-mono'>{description}</p>
<button className='text-sm font-mono text-white bg-gray-900
px-4 py-2 rounded-lg mt-5'>{buttonText}
</button>

</div>
</section>
  )
}

export default LargeCard
