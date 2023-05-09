import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Search() {
    const [open, setOpen] = useState(true);
    const menus = [
        { title: "inbox" , src: "inbox"},
        { title: "houses" , src: "home"},
        { title: "analytics" , src: "analyse"},
        { title: "settings" , src: "settings"}
    ]
  return (
    <div>
      <Header />
        <div className='flex bg-gray-100 text-gray-700'>
            <div className={`${open ? "w-60" : "w-20"} h-screen relative  bg-red-400`}>
                <img 
                src='./assests/arrow.png' 
                className='absolute rounded-full cursor-pointer -right-3 top-9 w-7 border-2 border-dark-purple' 
                onClick={()=>setOpen(!open)}
                />
                
                <ul className={`gap-x-4 pt-6 origin-left font-medium text-xl duration-300`}>
                {menus.map((menu,index)=>(
                    <li key={index} className={`rounded-full text-gray hover:border active:scale-95 text-s flex items-center gap-x-4 cursor-pointer p-2 ${!open ? 'transform scaleX(0)' : ''}`}>
                        <img src={`./assests/${menu.src}.png`} />
                        <span className={`text-white transition transform ${!open ? 'transform scaleX(0)' : ''}`}>{menu.title}</span>
                    </li>
                ))}
            </ul>
            </div>
            <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
                <h1 className=''>Home Page</h1>
            </div>
        </div>
      <main>
        
      </main>

      <Footer />
    </div>
  )
}

export default Search
