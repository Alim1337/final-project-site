import { useState } from "react";
import LoginBg from "../components/LoginBg";

function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your login logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[300px] sm:h-[400px] bg-white lg:h-[700px] xl:h-[800px] 2xl:h-[900px]">
        <LoginBg className="absolute top-0 left-0 w-full h-full z-0" />
      </div>
      <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full z-10">
        <div className="max-w-sm mx-auto p-6 bg-white rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Mot de passe:
              </label>
              <input
                className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="text-red-500 bg-white border border-red-100 px-10 py-2 font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
                type="submit"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientLogin;
