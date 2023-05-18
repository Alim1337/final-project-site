import { useState } from "react";
import { useRouter } from "next/router";
import BgLogin from "@/components/bg_login";

function ClientLogin() {
  const [email, setEmail] = useState("");
  const [mdps, setMdps] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !mdps) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Send a request to your backend API to check if the client exists in the database
    const response = await fetch("/api/login_api", {
      method: "POST",
      body: JSON.stringify({ email, mdps }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        // Client exists, proceed with login
        router.push("/");
      } else {
        // Client does not exist, prompt for correct information
        setErrorMessage("Les informations de connexion ne sont pas valides.");
      }
    } else {
      // Error occurred during API request
      setErrorMessage("Une erreur s'est produite lors de la demande de connexion.");
    }
  };

  return (
    <div>
      <BgLogin />
      <form onSubmit={handleSubmit}>
        <div className="bg-white text-black font-mono text-xl">
          <label className="text-black font-mono text-xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="text-black font-mono text-xl">
          <label className="text-black font-mono text-xl" htmlFor="mdps">
            Password
          </label>
          <input
            id="mdps"
            type="password"
            value={mdps}
            onChange={(e) => setMdps(e.target.value)}
            required
          />
        </div>
        <button className="text-black font-mono text-xl" type="submit">
          Se connecter
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
    </div>
  );
}

export default ClientLogin;
