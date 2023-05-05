import React, { useState } from "react";
import axios from "axios";

function DevenirP() {
  const [isProprietaire, setIsProprietaire] = useState(false);
  const [mdp, setMdp] = useState("");
  const [confirmerMdp, setConfirmerMdp] = useState("");
  const [description, setDescription] = useState("");
  const [typeBien, setTypeBien] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [prixEstime, setPrixEstime] = useState("");

  const ajouterBien = async () => {
    try {
      const response = await axios.post("/api/biens", {
        description,
        type_bien: typeBien,
        adresse,
        ville,
        code_postal: codePostal,
        prix_estime: prixEstime,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mdp === confirmerMdp) {
      setIsProprietaire(true);
      ajouterBien();
    } else {
      alert("Les mots de passe ne correspondent pas");
    }
  };

  if (isProprietaire) {
    return (
      <div>
        <h1>Félicitations, vous êtes maintenant propriétaire</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
  <h1 className="text-3xl font-bold mb-6">Devenir Propriétaire</h1>
  <form onSubmit={handleSubmit} className="w-full max-w-md">
    <div className="mb-4">
      <label htmlFor="mdp" className="block font-medium mb-2">
        Mot de passe:
      </label>
      <input
        id="mdp"
        type="password"
        value={mdp}
        onChange={(event) => setMdp(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="confirmerMdp" className="block font-medium mb-2">
        Confirmer mot de passe:
      </label>
      <input
        id="confirmerMdp"
        type="password"
        value={confirmerMdp}
        onChange={(event) => setConfirmerMdp(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block font-medium mb-2">
        Description:
      </label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="typeBien" className="block font-medium mb-2">
        Type de bien:
      </label>
      <input
        id="typeBien"
        type="text"
        value={typeBien}
        onChange={(event) => setTypeBien(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="adresse" className="block font-medium mb-2">
        Adresse:
      </label>
      <input
        id="adresse"
        type="text"
        value={adresse}
        onChange={(event) => setAdresse(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="ville" className="block font-medium mb-2">
        Ville:
      </label>
      <input
        id="ville"
        type="text"
        value={ville}
        onChange={(event) => setVille(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="codePostal" className="block font-medium mb-2">
        Code postal:
      </label>
      <input
        id="codePostal"
        type="text"
        value={codePostal}
        onChange={(event) => setCodePostal(event.target.value)}
        className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="flex justify-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Devenir propriétaire</button>
      </div>
    </form>
  </div>
);
}



export default DevenirP;