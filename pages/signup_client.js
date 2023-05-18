import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormClient from '../components/form_client';
import Header_signup from '@/components/Header_signup';
import BgLogin from '@/components/bg_login';

export default function SignupClient() {
  const [signupCompleted, setSignupCompleted] = useState(false);

  async function handleSubmit(nom, prenom, email, telephone, mdps, date_naissance, sex) {
    const response = await fetch('/api/api_insert_client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        telephone,
        mdps,
        date_naissance,
        sex,
      }),
    });

    const data = await response.json();
    console.log('Result:', data);

    if (response.ok) {
      setSignupCompleted(true);
      toast.success('Signup completed!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const errorMessage = data?.error || 'Error creating user';
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div>
      <Header_signup />
      <BgLogin />
      <FormClient onSubmit={handleSubmit} />
      <ToastContainer />
    </div>
  );
}
