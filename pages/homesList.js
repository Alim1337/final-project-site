import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router';

function homesList({searchResults}) {
  const router = useRouter();
  const {location} = router.query
  
  return (
    <div className=' bg-slate-50'>
      <Header />
        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <div className='h-screen text-black text-xs'>
                    <h1 className=' text-3xl font-semibold mb-6 '>{location}</h1>
                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap '>
                        <p className='button'>Type</p>
                        <p className='button'>Price</p>
                        <p className='button'>Filters</p>
                    </div>
                </div>

                <div>
                  {/*searchResults.map(({ img, location, title, description, star, price, total}) => (
                    key={img},
                    img = {img},
                    location = {location},
                    title = {title},
                    description = {description},
                    star = {star},
                    price = {price},
                    total = {total}
                  ))*/}
                </div>

                
            </section>
        </main>
      <Footer/>
    </div>
  )
}

export default homesList

{/*export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then((res) => res.json())
  
  return{
    props :{
      searchResults,
    }
  }
}*/}
