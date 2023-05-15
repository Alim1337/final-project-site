import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import BgLogin from "../components/bg_login";
import Footer from "@/components/Footer";
import Header_signup from "@/components/Header_signup";
import BienForm from "@/components/BienForm";


function Page() {

 
  return (
    <div>
  <Header_signup/>
  <BgLogin />
  <BienForm/>
</div>



  );
}

export default Page;
