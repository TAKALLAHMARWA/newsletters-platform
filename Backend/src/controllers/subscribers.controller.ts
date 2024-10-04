import { RequestHandler } from 'express';
import Subscriber from '../models/subscribers.model';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { validateEmail } from '../utils/ZeroBounceApi'; // Assurez-vous d'avoir cette fonction
import { generateAnalyticsData } from '../utils/analytics.generator'; // Import de la fonction utilitaire
export const createSubscriber: RequestHandler = async (req, res, next) => {
    const { email, username } = req.body;
    try {
        // Fetch all users from Clerk
        const { data: allUsers } = await clerkClient.users.getUserList();

        // Find the newsletter owner
        const newsletterOwner = allUsers.find((i) => i.username === username);

        if (!newsletterOwner) {
            return res.status(400).json({ error: "Username is not valid!" });
        }

        // Check if subscriber already exists
        const isSubscriberExist = await Subscriber.findOne({
            email,
            newsLetterOwnerId: newsletterOwner.id,
        });

        if (isSubscriberExist) {
            return res.status(400).json({ error: "Email already exists!" });
        }

        // Validate email
        const validationResponse = await validateEmail({ email });
        if (validationResponse.status === "inValid") {  // Ajustez ceci en fonction de votre implémentation
            return res.status(400).json({ error: "Email not valid!" });
        }

        // Create new subscriber
        const newSubscriber = await Subscriber.create({
            email,
            newsLetterOwnerId: newsletterOwner.id,
            source: "Merve platform",
            status: "Subscribed",
        });

        res.status(201).json(newSubscriber);
    }
    catch (error) {
        next(error);
    }
};
// Contrôleur pour récupérer les abonnés (subscribers) d'un propriétaire de newsletter
export const getSubscribers: RequestHandler = async (req, res, next) => {
    const { newsLetterOwnerId } = req.params; // Récupérer l'ID du propriétaire depuis les paramètres de requête

    try {
        

        // Rechercher les abonnés liés au propriétaire de la newsletter
        const subscribers = await Subscriber.find({
            newsLetterOwnerId,
        });

        // Retourner la liste des abonnés
        return res.status(200).json(subscribers);
    } catch (error) {
        next(error);
        
    }

};


// Méthode pour récupérer les données d'analyse des abonnés
export const subscribersAnalytics: RequestHandler = async (req, res, next) => {
  try {
    // Utiliser la fonction utilitaire pour générer les données
    const analyticsData = await generateAnalyticsData(Subscriber);
    res.status(200).json(analyticsData);
  } catch (error) {
    next(error);
  }
};
