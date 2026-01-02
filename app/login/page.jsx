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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, motDePasse }),
        }
      );

      if (res.ok) {
        const user = await res.json();
        login(user);
        router.push("/home");
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } catch (err) {
      setError("Erreur réseau ou serveur.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: 'url("/conn.jpg")' }}
    >
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#036c94] mb-6">
          Connexion
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm sm:text-base mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg leading-normal antialiased"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg leading-normal antialiased"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#036c94] hover:bg-blue-700 text-white p-3 rounded-md font-semibold transition text-sm sm:text-base md:text-lg"
          >
            Connexion
          </button>
        </form>

        <p
          onClick={() => router.push("/motdepasse-oublie")}
          className="text-center text-sm sm:text-base md:text-lg text-blue-600 hover:underline cursor-pointer mt-4 antialiased"
        >
          Mot de passe oublié ?
        </p>

        <hr className="my-4" />

        <button
          type="button"
          onClick={() => router.push("/inscription")}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md font-semibold transition text-sm sm:text-base md:text-lg"
        >
          Créer un nouveau compte
        </button>
      </div>
    </div>
  );
}
