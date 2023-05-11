import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import BgLogin from "../components/bg_login";
import Footer from "@/components/Footer";
import Header_signup from "@/components/Header_signup";

function ClientSignup() {
    const [Nom,setNom]=useState("");
    const [PreNom,setPreNom]=useState("");
    const[Date,setDate]=useState("");
    const[Telephone,setTelephone]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[Sex,setSex]=useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    try {
      // Make a POST request to the API endpoint
      const response = await fetch("pages/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom,
          PreNom,
          Date,
          Telephone,
          email,
          password,
          Sex,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de l'inscription.");
      }
  
      // Redirect to the homepage
      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  

  return (
    <div>
    <div className="flex flex-col min-h-screen">
    <Header_signup/>

  <BgLogin />
   <form id="form"onSubmit={handleSubmit} className="max-w-md mx-auto bg-center p-9 rounded shadow-md ">
   <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Nom <span className="text-red-500">*</span>:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="Nom"
          type="Nom"
          placeholder="Nom"
          value={Nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
        PreNom <span className="text-red-500">*</span>:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="PreNom"
          type="PreNom"
          placeholder="PreNom"
          value={PreNom}
          onChange={(e) => setPreNom(e.target.value)}
          required
        />
      </div>
      <div>
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="Date">Date De Naissance</label>
                      <input
                        type="date"
                        id="Date"
                        name="Date"
                    
                        className="border-gray-400 border-2 rounded-lg w-full px-4 py-2 mt-2"
                        value={Date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Telephone <span className="text-red-500">*</span>:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="Telephone"
          type="Telephone"
          placeholder="Telephone"
          value={Telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
      </div>

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
      <div className="mb-4">
      <label htmlFor="Sex" className="block text-gray-700 font-bold mb-2">
        Sex<span className="text-red-500">*</span>
      </label>
      <select
        id="Sex"
        value={Sex}
        onChange={(e) => setSex(e.target.value)}
        className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
      >
        <option value="neuf">Homme</option>
        <option value="bon etat">Femme</option>
      
      </select>
    </div>
      <div className="flex justify-between">
        <button
          className="text-red-500 bg-white border border-red-100 px-10 py-2
           font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
          type="submit"
        >
          Se connecter
        </button>
      </div>
    </form>


</div>
<Footer />
</div>



  );
}

export default ClientSignup;
