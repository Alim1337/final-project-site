import { useState } from "react";
import { useHistory } from "react-router-dom";

function ClientLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Authenticate the user here

    // Redirect to the homepage
    history.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-sm mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Se connecter</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email <span className="text-red-500">*</span>:
            </label>
            <input
              className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Mot de passe <span className="text-red-500">*</span>:
            </label>
            <input
              className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
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
  );
}

export default ClientLogin;
