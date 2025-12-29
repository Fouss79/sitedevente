'use client';

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motDePasse }),
      });

      if (res.ok) {
        const user = await res.json();
        login(user);

      
          router.push("/home");
        
      }
    } catch (err) {
      setError("Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4" style={{ backgroundImage: 'url("/conn.jpg")' }}>
      
      

        <div className="w-full max-w-sm bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#036c94] hover:bg-blue-700 text-white p-3 rounded-md font-semibold"
            >
              Connexion
            </button>

            <p className="text-center text-sm text-blue-600 hover:underline cursor-pointer">
              Mot de passe oublié ?
            </p>

            <hr className="my-4" />

            <button
              type="button"
              onClick={() => router.push("/inscription")}
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md font-semibold"
            >
              Créer un nouveau compte
            </button>
          </form>
        </div>
      </div>
    
  );
}
