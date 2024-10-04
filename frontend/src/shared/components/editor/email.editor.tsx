"use client";
import React, { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

interface EmaileditorProps {
  subjectTitle: string;
}

const Emaileditor: React.FC<EmaileditorProps> = ({ subjectTitle }) => {
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any>(null);
  const { user } = useClerk();
  const emailEditorRef = useRef<EditorRef>(null);
  const history = useRouter();

  // Fonction pour envoyer l'email
  const handleSendEmail = async (html: string) => {
    const response = await fetch('http://localhost:5000/newsletters/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: ["sponsorship@MervePlatform.com"], 
        subject: subjectTitle,
        content: html,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      toast.success(result.message);
      history.push("/dashboard/write");
    } else {
      console.error('Erreur lors de l\'envoi de l\'email');
      toast.error("Failed to send email.");
    }
  };

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
      await handleSendEmail(html); // Appel à la nouvelle fonction
    });
  };

  // Fonction exécutée lorsque l'éditeur est prêt
  const onReady: EmailEditorProps["onReady"] = () => {
    const unlayer = emailEditorRef.current?.editor;
    if (unlayer && jsonData) {
      console.log("Loading design with:", jsonData); // Log avant de charger le design
      unlayer.loadDesign(jsonData); // Charger le design JSON dans l'éditeur
    }
  };

  // Fonction pour sauvegarder la newsletter
  const saveNewsletter = async () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data: any) => {
      const { design } = data;
      console.log("Saving design:", design); // Log du design sauvegardé
      setJsonData(design); // Mettre à jour l'état avec les données du design

      // Appel au backend pour sauvegarder la newsletter
      await fetch("http://localhost:5000/newsletters/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: subjectTitle,
          content: JSON.stringify(design), // Sauvegarder le contenu 
          newsLetterOwnerId: user?.id,
        }),
      })
        .then(async (response) => {
          const res = await response.json();
          toast.success(res.message); // Afficher un toast de succès
          history.push("/dashboard/write"); // Redirection après sauvegarde
        })
        .catch((error) => {
          console.error("Error saving newsletter:", error); // Log de l'erreur
          toast.error("Failed to save newsletter.");
        });
    });
  };

  // Fonction pour récupérer les détails d'une newsletter existante
  const fetchNewsletterDetails = async () => {
    console.log('Entering fetchNewsletterDetails');
    try {
      const response = await fetch(
        `http://localhost:5000/newsletters/details?title=${subjectTitle}&newsLetterOwnerId=${user?.id}`
      );
      const res = await response.json(); // Parse the response to JSON
      console.log('Fetched newsletter details:', res); // Log the entire response for inspection
  
      // Since the response is an array, access the first element and its content
      if (res && res.length > 0 && res[0].content) {
        setJsonData(JSON.parse(res[0].content)); // Parse and update jsonData dynamically
      } else {
        console.error("Content field is missing in the response.");
      }
    } catch (error) {
      console.error("Error fetching newsletter details:", error); // Log the error
      toast.error("Failed to load newsletter details.");
    } finally {
      setLoading(false); // End the loading state
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchNewsletterDetails(); // Load the dynamic content when the user is connected
    }
  }, [user]);

  return (
    <>
      {!loading && (
        <div className="w-full h-[90vh] relative">
          {/* Composant EmailEditor */}
          <EmailEditor minHeight="80vh" ref={emailEditorRef} onReady={onReady} />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            {/* Bouton de sauvegarde */}
            <Button
              className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={saveNewsletter}
            >
              <span className="opacity-[.7]">Save Draft</span>
            </Button>
            {/* Bouton d'exportation HTML */}
            <Button
              className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Emaileditor;
