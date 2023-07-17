import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import BgLogin from '@/components/bg_login';

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
      const { token, userType, statusVIP } = await response.json();
      console.log('Token:', token);
      console.log('User Type:', userType);
      localStorage.setItem('token', token);
      console.log(statusVIP)
      toast.success('Login Successful!', {
        position: toast.POSITION.TOP_CENTER,
      })

      if (statusVIP) {
        console.log('Redirecting to /Vip');
        router.push('/Vip');
      } else if (userType === 'proprietaire') {
        console.log('Redirecting to /panel');
        router.push('/panel');
      } else if (userType === 'client') {
        console.log('Redirecting to /panel');
        router.push('/panel');
      }
    } else {
      const error = await response.text();
      console.error('Login Error:', error);
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  function handleSignup(event) {
    event.preventDefault();
    router.push('/signup_client');
  }
  return (
    <div>
      <section>
        <Header/>
        <BgLogin/>
        <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full text-gray-700 border-red-100 bg-white bg-opacity-80  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Connexion
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium">Mot de pass</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="">Souvenir de moi</label>
                    </div>
                  </div>
                </div>
                <div className=''>
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                >
                  Connecter
                </button>
                </div>
                
                <p className="text-sm font-light">
              Vous n avez pas un compte?{}
              <a
                href="#"
                onClick={handleSignup}
                className="font-medium text-primary-600 hover:underline"
              >
                Inscrire
              </a>
            </p>
          </form>
            </div>
          </div>
        </div>
        <ToastContainer />

      </section>
    </div>
  );
}
