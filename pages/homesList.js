import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import InfoCard from '@/components/InfoCard'
import { useRouter } from 'next/router';

function homesList({searchResults}) {
  const router = useRouter();
  const {location} = router.query
  
  return (
    <div className=' bg-slate-50'>
      <Header />
      <div>
        <main className='flex'>
          <section className='flex-grow pt-14 px-6'>
            <div className='h-screen text-black text-xs'>
              <h1 className=' text-3xl font-semibold mb-6 '>{location}</h1>
              <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap '>
                <p className='button'>Type</p>
                <p className='button'>Price</p>
                <p className='button'>Filters</p>
              </div>
              <div className='flex flex-col'>
                <InfoCard
                  key="https://links.papareact.com/xqj"
                  img = "https://links.papareact.com/xqj"
                  location = "Private room in center of London"
                  title = "Stay at this spacious Edwardian House"
                  description = "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star = "4.73"
                  price = "£30 / night"
                  total = "£117 total"
                />
                <InfoCard
                  key="https://links.papareact.com/xqj"
                  img = "https://links.papareact.com/xqj"
                  location = "Private room in center of London"
                  title = "Stay at this spacious Edwardian House"
                  description = "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star = "4.73"
                  price = "£30 / night"
                  total = "£117 total"
                />
                <InfoCard
                  key="https://links.papareact.com/xqj"
                  img = "https://links.papareact.com/xqj"
                  location = "Private room in center of London"
                  title = "Stay at this spacious Edwardian House"
                  description = "1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                  star = "4.73"
                  price = "£30 / night"
                  total = "£117 total"
                />      
              </div>
            </div>
          </section>
        </main>
        </div>
      <Footer/>
    </div>
  )
}

export default homesList