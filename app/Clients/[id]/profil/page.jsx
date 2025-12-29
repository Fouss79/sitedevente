"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function ProfilPage() {
    const params = useParams();
    const {id}= useParams();
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8080/api/utilisateur/${id}`);
      const data = await res.json();
      setUser(data);

      if (data.notification) {
        setNotification(data.notification);

        // Effacer la notification du backend
        await fetch(`http://localhost:8080/api/utilisateur/${id}/clear-notification`, {
          method: "PUT",
        });
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Mon Profil</h1>

      {notification && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {notification}
        </div>
      )}

      {user && (
        <div>
          <p>Nom : {user.nom}</p>
          <p>Email : {user.email}</p>
          <p>Rôle : {user.role}</p>
        </div>
      )}
    </div>
  );
}
