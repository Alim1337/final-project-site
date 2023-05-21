import { useState } from "react";
function FormClient({ onSubmit }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [mdps, setMdps] = useState("");
 
  const [ date_naissance, setDateNaissance] = useState();

  const [sex, setSex] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  
    // Convert the string date to a DateTime object
    const formattedDate = date_naissance ? new Date(date_naissance) : null;
  
    onSubmit(
      nom,
      prenom,
      email,
      telephone,
      mdps,
      formattedDate,
      sex
    );
  }
  

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-center p-9 rounded shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Nom <span className="text-red-500">*</span>:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline w-full"
          id="nom"
          type="nom"
          placeholder="nom"
          value={nom}
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
          id="prenom"
          type="prenom"
          placeholder="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
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
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Telephone <span className="text-red-500">*</span>
</label>
<input
className="shadow appearance-none border rounded w-full py-2 px-3
 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
id="telephone"
type="tel"
placeholder="Enter your telephone number"
value={telephone}
onChange={(e) => setTelephone(e.target.value)}
required
/>
</div>
<div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Password <span className="text-red-500">*</span>:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="mdps"
          type="mdps"
          placeholder="mdps"
          value={mdps}
          onChange={(e) => setMdps(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
          Date De Naissance
        </label>
        <input
          type="date"
          id="date_naissance"
          name="date_naissance"
          className="border-gray-400 border-2 rounded-lg w-full px-4 py-2 mt-2"
          value={date_naissance}
          onChange={(e) => setDateNaissance(e.target.value)}
          required
        />
      </div>
     
<div className="mb-4">
   
    
  </div>
   
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
         Sex <span className="text-red-500">*</span>:
        </label>
        <input
          className="block border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          id="sex"
          type="sex"
          placeholder="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        />
      </div>

  <div className="flex items-center justify-between">
    <button
      className=" text-center content-center bg-blue-500 hover:bg-blue-700
       text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Inscrire
    </button>
  </div>
</form>
);
  }

export default FormClient;