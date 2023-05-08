import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function homesList() {
  return (
    <div className=' bg-slate-50'>
      <Header />
        <main className='flex'>
            <section>
                <div className='h-screen text-black text-xs'>
                    <h1 className=' text-3xl font-semibold mt-2 mb-6'>Discover</h1>
                    <div className='hidden lg:inline-flex'>
                        <p className='px-4 py-2 border rounded-full cursor-pointer 
                        hover:shadow-lg active:scale-95 active:bg-gray-100 
                        transition transform duration-100 ease-out'>Type</p>
                        <p className='px-4 py-2 border rounded-full cursor-pointer 
                        hover:shadow-lg active:scale-95 active:bg-gray-100 
                        transition transform duration-100 ease-out'>Price</p>
                        <p className='px-4 py-2 border rounded-full cursor-pointer 
                        hover:shadow-lg active:scale-95 active:bg-gray-100 
                        transition transform duration-100 ease-out'>Filters</p>
                    </div>
                </div>
            </section>
        </main>
      <Footer/>
    </div>
  )
}

export default homesList
