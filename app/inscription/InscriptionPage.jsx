"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InscriptionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    telephone: "",
    adresse: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/utilisateur", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/login"); // rediriger vers la page de connexion après inscription
    } else {
      const result = await res.json();
      setError(result.message || "Échec de l'inscription.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Créer un nouveau compte</h2>
        <p className="text-center text-sm text-gray-500 mb-6">C'est rapide et facile.</p>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              name="prenom"
              type="text"
              placeholder="Prénom"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-md"
              required
            />
            <input
              name="nom"
              type="text"
              placeholder="Nom de famille"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-md"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Adresse e-mail"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <input
            name="motDePasse"
            type="password"
            placeholder="Nouveau mot de passe"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <input
            name="telephone"
            type="text"
            placeholder="Numéro de téléphone"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />

          <input
            name="adresse"
            type="text"
            placeholder="Adresse"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-md font-semibold"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Vous avez déjà un compte ?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Connectez-vous
          </span>
        </p>
      </div>
    </div>
  );
}
