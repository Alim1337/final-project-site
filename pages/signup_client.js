import { useState } from 'react';
import FormClient from '../components/form_client';
import Header_signup from '@/components/Header_signup';
import BgLogin from '@/components/bg_login';

export default function SignupClient() {
  
  async function handleSubmit(nom ,
    prenom,
    email,
    telephone ,
    mdps,
    date_naissance,
    sex,
    ) {
    const response = await fetch('/api/api_insert_client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom ,
        prenom,
        email,
        telephone ,
        mdps,
        date_naissance,
        sex,
        }),

    })
  
    const data = await response.json()
    console.log('Result:', data)
  }
  return (
    <div >

      <Header_signup/>
      <BgLogin/>
      <FormClient onSubmit={handleSubmit} />
    </div>
    

  );
}
