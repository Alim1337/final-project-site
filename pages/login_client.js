// pages/login_client.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderSignup from '@/components/Header_signup';
import BgLogin from '@/components/bg_login';

import 'react-toastify/dist/ReactToastify.css';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch('/api/api_login_client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const { token, userType } = await response.json();
      console.log('Token:', token);
      console.log('User Type:', userType);
      localStorage.setItem('token', token);

      if (userType === 'proprietaire') {
        console.log('Redirecting to /proprietaireHouses');
        router.push('/proprietaireHouses');
      } else if (userType === 'client') {
        console.log('Redirecting to /clientHouses');
        router.push('/clientHouses');
      }
    } else {
      const error = await response.text();
      console.error('Login Error:', error);
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <BgLogin />
      <HeaderSignup />

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
