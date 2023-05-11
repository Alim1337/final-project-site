import BgLogin from "../components/bg_login";
import Footer from "@/components/Footer";
import BienForm from "@/components/BienForm";
import Header from "@/components/Header";

function Page() {

 
  return (
    
   <div className="flex flex-col min-h-screen">
  <Header />
  <BgLogin />
  <BienForm/>
</div>
  );
}

export default Page;
