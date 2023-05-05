import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { query } from './api/db';
import Banner2 from '../components/Banner2';
import React from 'react';
import SignupBg from '../components/signup_bg';


function SignUp() {
  const router = useRouter();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateDeNaissance, setDateDeNaissance] = useState('');
  const [sexe, setSexe] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const result = await query(
        'INSERT INTO "Client" (nom, prenom, email, password, date_de_naissance, sexe) VALUES ($1, $2, $3, $4, $5, $6)',
        [nom, prenom, email, password, dateDeNaissance, sexe]
      );

      console.log(result);

      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    
    
<div className="flex flex-col min-h-screen">
  <div className="relative h-[300px] sm:h-[400px] bg-white lg:h-[700px] xl:h-[800px] 2xl:h-[900px]">
    <SignupBg className="absolute top-0 left-0 w-full h-full z-0" />
    <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full z-10">
      <div className="flex-grow max-w-sm mx-auto p-6 bg-white rounded shadow-md">
        <form onSubmit={handleSubmit}>
      <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2" >
    Nom:
  </label>
  <input
    className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
    id="nom"
    type="text"
    placeholder="Nom"
    value={nom}
    onChange={(e) => setNom(e.target.value)}
  />
</div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2" 
         
        >
          Prénom:
          <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            id="prenom"
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="email"
        >
          Email:
          <input
            className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2"htmlFor="password">
          Mot de passe:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="password"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2"htmlFor="confirmerMotDePasse">
          Confirmer mot de passe:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmerMotDePasse"
          type="password"
          placeholder="******"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="dateDeNaissance">
          Date de naissance:
        </label>
        <input
          className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dateDeNaissance"
          type="date"
          placeholder="Date de naissance"
          value={dateDeNaissance}
          onChange={(e) => setDateDeNaissance(e.target.value)}
        />
      </div>
      <div className="mb-4 ">
  <label className="block text-gray-700 font-bold mb-2" htmlFor="sexe">
    Sexe:
  </label>
  <select
    className=" block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline
    text-black"
    id="sexe"
    value={sexe}
    onChange={(e) => setSexe(e.target.value)}
  >
    <option value="">Sélectionner votre sexe</option>
    <option value="homme">Homme</option>
    <option value="femme">Femme</option>
    
  </select>
</div>
<div class="flex flex-col">
  <button
    class="text-red-500 bg-white border border-red-100 px-10 py-8 font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
    type="submit"
  >
    S'inscrire
  </button>
 
  <button
    class="text-red-500 bg-white border border-red-100 px-10 py-8 font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
    type="submit"
  >
    Vous avez deja un compte ?
  </button>
</div>




</form>
      </div>
    </div>
  </div>
</div>
  )
}
  

export default SignUp;

