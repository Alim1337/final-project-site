import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header_signup from '@/components/Header_signup';

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
      const { token } = await response.json();
      localStorage.setItem('token', token);
      router.push('/clientHouses');
    } else {
      const error = await response.text();
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <div >
          <Header_signup/>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}
