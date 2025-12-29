"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Image from "next/image";

const ListeCommandesClient = () => {
  const { user, isAuthenticated } = useAuth();
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!user?.id) return;

    const fetchCommandes = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/commande/client/${user.id}`
        );
        setCommandes(response.data);
      } catch (error) {
        console.error(error);
        setErreur("Erreur lors de la récupération des commandes.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, [user, API_URL]);

  if (!isAuthenticated) {
    return (
      <div className="p-10 text-center text-red-600">
        Vous devez être connecté pour voir vos commandes.
      </div>
    );
  }

  if (loading)
    return (
      <div className="p-10 text-center">Chargement des commandes...</div>
    );

  if (erreur)
    return (
      <div className="p-10 text-center text-red-600">{erreur}</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-white bg-[#036c94] p-4 mb-6 rounded">
        📦 Mes Commandes
      </h1>

      {commandes.length === 0 ? (
        <p className="text-gray-500">
          Vous n'avez encore passé aucune commande.
        </p>
      ) : (
        <div className="space-y-8">
          {commandes.map((commande) => (
            <div
              key={commande.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-lg">
                  Commande N°{commande.id}
                </p>
                <p className="text-sm text-gray-600">
                  Date :{" "}
                  {new Date(commande.dateCommande).toLocaleString()}
                </p>
              </div>

              <p className="mb-2 text-sm text-gray-700">
                Statut :{" "}
                <span className="font-semibold text-blue-700">
                  {commande.statut}
                </span>
              </p>

              <ul className="divide-y">
                {commande.lignes?.map((ligne, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 py-2"
                  >
                    <div className="w-16 h-16 overflow-hidden rounded border">
                      <Image
                        src={`${API_URL}/${ligne.produit.image}`}
                        alt={ligne.produit.nom}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold">
                        {ligne.produit.nom}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantité : {ligne.quantite}
                      </p>
                      <p className="text-sm text-gray-600">
                        Prix unitaire : {ligne.produit.prix} FCFA
                      </p>
                      <p className="text-sm text-green-700 font-bold">
                        Total :{" "}
                        {ligne.quantite * ligne.produit.prix} FCFA
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-right text-lg font-bold text-green-700">
                Total commande : {commande.total} FCFA
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeCommandesClient;
