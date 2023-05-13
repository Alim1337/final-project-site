import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import BgLogin from "@/components/bg_login";

function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setErrorMessage("Les informations de connexion ne sont pas valides.");
    } else {
      router.push("/");
    }
  };

  return (
    <div>
    
    <BgLogin/>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Erreur: {error.message}</div>}
      {!session && (
        <form onSubmit={handleSubmit}>
          <div className="bg-white text-black font-mono text-xl">
            <label className="text-black font-mono text-xl"
             htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div  className="text-black font-mono text-xl">
            <label  className="text-black font-mono text-xl" 
            htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button  className="text-black font-mono text-xl"
           type="submit">Se connecter</button>
          <p  className="text-black font-mono text-xl">Or Signup With Google</p>
         <button 
         className="btn btn-link btn-floating-mx-1 text-black font-mono text-xl"
         type ="button"
         onClick={()=>signIn('google')}
         >
          <i className="fab fa-google"></i>
          </button> 
        </form>
      )}
      {session && (
        <div  className="text-black font-mono text-xl">
          <p  className="text-black font-mono text-xl">Bonjour {session.user.name}!</p>
          <button  className="text-black font-mono text-xl"
          onClick={() => signOut()}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}

export default ClientLogin;
