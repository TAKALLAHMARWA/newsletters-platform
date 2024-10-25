"use server";
import nodemailer from "nodemailer";

interface Props {
  userEmail: string[];
  subject: string;
  content: string;
}

// Remplace la configuration SMTP selon ton fournisseur d'email (exemple pour Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Par exemple, pour Gmail
  port: 587,
  secure: false, // true pour SSL, false pour TLS
  auth: {
    user: process.env.EMAIL_USER, // Adresse email utilisateur (configurée dans .env)
    pass: process.env.EMAIL_PASS, // Mot de passe ou mot de passe d'application
  },
});

// Adresse de l'expéditeur
const adminMail = "takallahmarwa@gmail.com";

// Fonction d'envoi de l'email
export const sendEmail = async ({ userEmail, subject, content }: Props) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail, // Adresse de l'expéditeur
      to: userEmail,   // Destinataire (tableau de plusieurs adresses)
      subject: subject, // Sujet de l'email
      html: content,    // Contenu HTML de l'email
    });

    return response;
  } catch (error) {
    console.log('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};
