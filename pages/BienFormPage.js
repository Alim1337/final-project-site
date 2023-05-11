import BgLogin from "../components/bg_login";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/router";

function Page() {
  
  
  const [titre, setTitre] = useState('');
  const [desciption, setDesciption] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [prix, setPrix] = useState('');
  const router = useRouter();
  const {button1, button2} = router.query
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {         
      titre,              
      desciption,          
      type,            
      location,        
      prix     
    };
    // Submit logic here
  };

  return (
    
    <div>
    <div className="flex flex-col min-h-screen">
   <Header />
   <BgLogin />
   <form
     onSubmit={handleSubmit}
     className="max-w-sm mx-auto bg-center cursor-pointer bg-slate-50 transition transform duration-100 ease-out 
     p-6 rounded shadow-md flex flex-col justify-center"
   >
     <div className="mb-4">
       <label htmlFor="desciption" className="block text-gray-700 font-bold mb-2">
       Titre  
       </label>
       <input
         type="text"
         id="titre"
         value={titre}
         onChange={(e) => setTitre(e.target.value)}
         className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
       />
     </div>
     <div className="mb-4">
       <label htmlFor="desciption" className="block text-gray-700 font-bold mb-2">
       Desciption 
       </label>
       <input
         type="text"
         id="desciption"
         value={desciption}
         onChange={(e) => setDesciption(e.target.value)}
         className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
       />
     </div>
     <div className="mb-4">
       <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
       type
       </label>
       <select
         id="type"
         value={type}
         onChange={(e) => setType(e.target.value)}
         className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
       >
         <option value="H">Villa</option>
         <option value="F">Appartement</option>
       </select>
     </div>

     <div className="mb-4">
       <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
       Location 
       </label>
       <input
         type="text"
         id="location"
         value={location}
         onChange={(e) => setLocation(e.target.value)}
         className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
       />
     </div>
     <div className="mb-4">
       <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
       Prix 
       </label>
       <input
         type="number"
         id="prix"
         value={prix}
         onChange={(e) => setPrix(e.target.value)}
         className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
       />
     </div>

     <div className="flex justify-center">
     <button
           className="pl-5 text-white bg-red-600 border border-red-100 px-10 py-2 font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
           onClick={() => router.push({
             pathname : "/clientHouses",
             query: {

             }
           })}
         >
           {button2}
        </button>
     <button
           className="pl-5 text-red-500 bg-white border border-red-600 text-center px-10 py-2 font-mono shadow-md rounded-full font-bold my-4 hover:shadow-2xl active:scale-90 transition duration-150"
           onClick={() => router.push({
             pathname : "/clientHouses",
             query: {

             }
           })}
         >
           {button1}
        </button>
        
     </div>
   </form>
 </div>
 <Footer/>
 
 </div>
  );
}

export default Page;
