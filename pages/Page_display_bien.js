import React from 'react';
import HomeListPropsFeed from '../components/homeListPropsFeed';
import searchResults from './api/Data_searchResults';
import HeaderCDash from '@/components/HeaderCDash';
import BgLogin from '@/components/bg_login';
import Header from '@/components/Header';

function PageDisplayBien() {
  return (
    <div>
   <BgLogin/>

    <div>

     <Header/>

     <div>
     <HomeListPropsFeed searchResults={searchResults} />

     </div>
     </div>
    </div>
  );
}

export default PageDisplayBien;
