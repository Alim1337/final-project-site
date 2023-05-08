import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import BgLogin from "../components/bg_login";
import Footer from "@/components/Footer";
import Header_signup from "@/components/Header_signup";
function SignupClient() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mdps, setMdps] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [sex, setSex] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nom || !prenom || !email || !telephone || !mdps || !confirmPassword) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (mdps !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const data = {
      nom,
      prenom,
      email,
      telephone,
      mdps,
      date_naissance: dateNaissance,
      sex,
    
      date_dinscription: new Date(),
    };

    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/");
    } else {
      setErrorMessage("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Header_signup/>
      <BgLogin />
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto bg-center
        cursor-pointer
    hover:bg-transparent
    transition transform duration-100 ease-out bg-transparent p-6 rounded shadow-md flex flex-col justify-center"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Nom <span className="text-red-500">*</span>:
          </label>
          <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            id="nom"
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Prénom <span className="text-red-500">*</span>:
          </label>
          <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            id="prenom"
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Email <span className="text-red-500">*    </span> </label>
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
        Téléphone <span className="text-red-500">*</span>:
      </label>
      <input
        className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        id="telephone"
        type="tel"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        Mot de passe <span className="text-red-500">*</span>:
      </label>
      <input
        className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        id="mdps"
        type="password"
        placeholder="Mot de passe"
        value={mdps}
        onChange={(e) => setMdps(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        Confirmer mot de passe <span className="text-red-500">*</span>:
      </label>
      <input
        className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        id="confirmPassword"
        type="password"
        placeholder="Confirmer mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        Date de naissance:
      </label>
      <input
        className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        id="dateNaissance"
        type="date"
        placeholder="Date de naissance"
        value={dateNaissance}
        onChange={(e) => setDateNaissance(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        Sexe:
      </label>
      <select
        className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        id="sex"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
      >
        <option value="">Choisissez un sexe</option>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
      </select>
    </div>
    
    
    
    
    {errorMessage && (
      <div className="text-red-500 mb-4">{errorMessage}</div>
    )}
    <button
      className="text-red-500 flex-auto bg-white border border-red-100 px-10 py-2 font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
      type="submit"
    >
      Inscription
    </button>
  </form>
  <Footer />
</div>
);
}

export default SignupClient;