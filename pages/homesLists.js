import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeListPropsFeed from '../components/homeListPropsFeed';

function HomeList({ searchResults }) {
  return (
    <div className='bg-white'>
        <Header />
    <div className='bg-slate-50'>
    
      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <HomeListPropsFeed searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
    </div>
  );
}

export default HomeList;
