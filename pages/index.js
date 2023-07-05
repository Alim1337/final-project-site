import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import SmallCard from '@/components/SmallCard'
import MediumCard from '@/components/MediumCard'
import LargeCard from '@/components/LargeCard'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

/** @param {import('next').InferGetStaticPropsType<typeof getStaticProps> } props */
export default function Home({ exploreData,cardsData }) {
  return (
    <div className='bg-white'>
      <Head>
        <title>Home page</title>
      </Head>

      <Header />
      <Banner />

      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5 text-black font-mono'>
            Explore Nearby
          </h2>

          {/* PULL some data from a server - API endpoints */}
          <div className='grid grid-cols-1 sm:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4 text-black'>
          {exploreData?.map((item) => {
            const {img, distance, location} = item;
            return (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            );
          })}

          </div>
         
        </section>
        <br/>
        <section>
        <h2 className='text-4xl font-semibold pb-5 text-black font-mono'>live anywhere</h2>
          <div className='flex space-x-2 overflow-scroll scrollbar-hide
          p-3 -ml-3'>
            
          {cardsData?.map(({img,title})=>(
            <MediumCard key={img} img={img} title={title}/>


          )

          )}</div>
          
        </section>
<div className='text-white'>
        <LargeCard 
        img='https://cdn.thespaces.com/wp-content/uploads/2023/01/MED439BFB92B97F4F45A30524FFADED34B5.jpeg'
        title="The best place for u "
        description={"take your time"}
        buttonText="Get inspired" className="text-white font-bold"/>
        </div>
      </main>
      <Footer/> 
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/GZOI").then((res) => res.json())
  const cardsData = await fetch("https://www.jsonkeeper.com/b/QKJN").then((res) => res.json())
  

  return {
    props: {
      exploreData
      , cardsData
    }
  }
}
