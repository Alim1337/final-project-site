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
          <h2 className='text-4xl  pb-5 text-black font-mono'>
          Explorer à proximité          </h2>

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
        <h2 className='text-4xl pb-5 text-black font-mono'> Explorer les biens VIP</h2>
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
        title="Le meilleur endroit pour vous"
        description={"prenez votre temps"}
        buttonText="découvrir" className="text-white font-bold"/>
        </div>
      </main>
      <Footer/> 
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = [
    { img: "https://img.freepik.com/free-photo/old-buildings-port-evening_1268-14340.jpg", location: "Bordj El Bahri", distance: "20 min" },
    { img: "https://img.freepik.com/free-photo/design-house-modern-villa-with-open-plan-living_1258-169741.jpg", location: "Aïn Benian", distance: "25 min" },
    { img: "https://img.freepik.com/free-photo/3d-electric-car-building_23-2148972401.jpg", location: "Hydra", distance: "15 min" },
    { img: "https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661457.jpg", location: "Dar El Beïda", distance: "30 min" },
    { img: "https://img.freepik.com/free-photo/restaurant-complex-seashore-among-rocks_169016-12915.jpg", location: "Aïn Taya", distance: "35 min" },
    { img: "https://img.freepik.com/free-photo/beautiful-white-mosque-blue-sky_181624-39804.jpg", location: "Birkhadem", distance: "20 min" },
    { img: "https://img.freepik.com/free-photo/streets-with-architecture-resort-town_627829-8262.jpg", location: "Zéralda", distance: "45 min" },
    { img: "https://img.freepik.com/premium-photo/apartment-modern-houses-residential-buildings_250132-5234.jpg", location: "Rouïba", distance: "40 min" },
  ]

  const cardsData = [
    { img: "https://i.pinimg.com/originals/37/7e/6a/377e6a3255de4a183afbd9df0e32a1ce.jpg", title: "Escapades en plein air" },
    { img: "https://i.pinimg.com/564x/77/71/c1/7771c19e37d5d94526fc9b40c843192d.jpg", title: "Des séjours uniques" },
    { img: "https://i.pinimg.com/564x/a8/53/28/a85328fb6291717655363543beef809d.jpg", title: "Maisons entières" },
    { img: "https://i.pinimg.com/originals/84/0a/05/840a053cca1d1d54db7fb7b8ec1658ac.jpg", title: "À découvrir" },
    { img: "https://cdn.thespaces.com/wp-content/uploads/2023/01/MED439BFB92B97F4F45A30524FFADED34B5.jpeg", title: "Le meilleur pour vous" },
  ]

  return {
    props: {
      exploreData,
      cardsData,
    }
  }
}