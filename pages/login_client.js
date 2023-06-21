import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import Header from '@/components/Header';
import 'react-toastify/dist/ReactToastify.css';
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

      if (statusVIP) {
        console.log('Redirecting to /Vip');
        router.push('/Vip');
      } else if (userType === 'proprietaire') {
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

  function handleSignup(event) {
    event.preventDefault();
    router.push('/signup_client');
  }

  return (
<<<<<<< Updated upstream
    <section>
      <BgLogin />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://img.uxwing.com/wp-content/themes/uxwing/download/buildings-architecture-real-estate/property-icon.svg" alt="logo" />
          Ekrili
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-600 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
=======
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
>>>>>>> Stashed changes
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
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline">mot de pass oublier?</a>
                </div>
                <div className='flex items-center'>
                <button
                  type="submit"
                  className="text-red-500  flex-auto bg-white border border-red-100 px-4 py-2
                  font-mono shadow-md rounded-full font-medium my-2 mx-1 hover:shadow-2xl active:scale-90 transition duration-150"
                >
                  Connecter
                </button>
                </div>
                
                <p className="text-sm font-light">
              Vous n'avez pas un compte?{' '}
              <a
                href="#"
                onClick={handleSignup}
                className="font-medium text-primary-600 hover:underline"
              >
<<<<<<< Updated upstream
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="#"
                  onClick={handleSignup}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
=======
                Inscrire
              </a>
            </p>
          </form>
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
      </section>
    </div>
  );
}
