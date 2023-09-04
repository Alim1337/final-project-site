
import Head from 'next/head'
import BgLogin from '@/components/bg_login'
import HeaderCDash from '@/components/HeaderCDash'
import Sidebar from '@/components/sidebar'
import TopCards from '@/components/TopCards'

export default function CDashBoard() {
  return (
    <div className='bg-white flex-auto'>
        <div className='w-full'>
        <HeaderCDash className = 'bg-white ml-0 w-full'/>
        </div>
        <BgLogin/>
      <Head className="bg-white">
        <title>Client DashBoard</title>
      </Head>

      <main className='max-w-7xl mx-auto px-8 sm:px-16 bg-white w-full'>
        
        <div className='ml- 0'>
        <Sidebar className ='ml-0'/>
        </div>
        <div>
            <TopCards/>
        </div>
        
          </main>
    </div>
  )
}

