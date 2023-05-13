import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import BgLogin from "../components/bg_login";
import Footer from "@/components/Footer";
import Header_signup from "@/components/Header_signup";
import BienForm from "@/components/BienForm";
export default function BienFormPage() {
  
  async function handleSubmit(description,
    type_bien,
    adresse,
    ville,
    code_postal,
    prix_estime,
    etat,
   
    ) {
    const response = await fetch('/api/addBien', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description,
        type_bien,
        adresse,
        ville,
        code_postal,
        prix_estime,
        etat,
       
        }),

    })
   const data = await response.json()
   console.log('Result:', data)
  }
 
  return (
        <div>
  <BgLogin />
  <BienForm onSubmit={handleSubmit} />
  </div>



  );
}


