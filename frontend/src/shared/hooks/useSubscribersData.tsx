"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useSubscribersData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useClerk();

  useEffect(() => {
    // Ajoute un log pour vérifier si l'utilisateur est bien défini
    console.log("Utilisateur actuel:", user);

    // Appel de la fonction pour récupérer les abonnés
    if (user) {
      GetSubscribers(); // Appelle GetSubscribers seulement si l'utilisateur est défini
    } else {
      console.log("Aucun utilisateur trouvé.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetSubscribers = async () => {
    try {
      // Vérifie si l'utilisateur est connecté
      if (!user) {
        console.log("L'utilisateur n'est pas connecté");
        setLoading(false);
        return;
      }

      console.log("Tentative de récupération des abonnés pour l'utilisateur:", user.id);

      const response = await fetch(`http://localhost:5000/subscribers/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Réponse de l'API:", response);

      if (!response.ok) {
        console.error("Erreur lors de la récupération des abonnés:", response.statusText);
        throw new Error("Erreur lors de la récupération des abonnés");
      }

      const resData = await response.json();
      console.log("Données des abonnés récupérées:", resData);
      setData(resData);
    } catch (error) {
      console.error("Erreur lors de la récupération des abonnés:", error);
    } finally {
      setLoading(false);
      console.log("Chargement terminé.");
    }
  };

  return { data, loading };
};

export default useSubscribersData;
