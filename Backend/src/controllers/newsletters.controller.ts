import { RequestHandler } from 'express';
import newsletter from '../models/newsletters.model';
import { sendEmail } from '../utils/email.sender';


/**
 * @swagger
 * tags:
 *   name: Newsletters
 *   description: API pour la gestion des newsletters
 */

/**
 * @swagger
 * /newsletters:
 *   get:
 *     summary: Récupérer toutes les newsletters
 *     tags: [Newsletters]
 *     responses:
 *       200:
 *         description: La liste des newsletters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Newsletter'
 */
export const getNewsletterDetails: RequestHandler = async (req, res, next) => {
    const { title, newsLetterOwnerId } = req.query;
    try {
        const foundNewsletter = await newsletter.findOne({
            title,
            newsLetterOwnerId,
        });

        if (!foundNewsletter) {
            return res.status(404).json({ message: 'Newsletter non trouvée' });
        }

        res.status(200).json(foundNewsletter);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /newsletters/{newsletterId}:
 *   get:
 *     summary: Récupérer une newsletter par ID
 *     tags: [Newsletters]
 *     parameters:
 *       - in: path
 *         name: newsletterId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la newsletter
 *     responses:
 *       200:
 *         description: La newsletter correspondant à l'ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       404:
 *         description: Newsletter non trouvée
 */
export const getNewsletter: RequestHandler = async (req, res, next) => {
    const newsLetterOwnerId= req.query;
    try {
        const foundNewsletter = await newsletter.find(newsLetterOwnerId).exec();
        if (!foundNewsletter) {
            return res.status(404).json({ message: 'Newsletter non trouvée' });
        }
        res.status(200).json(foundNewsletter);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /newsletters:
 *   post:
 *     summary: Créer une nouvelle newsletter
 *     tags: [Newsletters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Newsletter'
 *     responses:
 *       201:
 *         description: Newsletter créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       400:
 *         description: Requête invalide
 */
export const createNewsletter: RequestHandler = async (req, res, next) => {
    const { title, content, newsLetterOwnerId } = req.body;
    try {
        const newNewsletter = await newsletter.create({ title, content, newsLetterOwnerId });
        res.status(201).json(newNewsletter);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /newsletters/{newsletterId}:
 *   put:
 *     summary: Mettre à jour une newsletter existante
 *     tags: [Newsletters]
 *     parameters:
 *       - in: path
 *         name: newsletterId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Newsletter'
 *     responses:
 *       200:
 *         description: Newsletter mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Newsletter'
 *       404:
 *         description: Newsletter non trouvée
 *       400:
 *         description: Requête invalide
 */
export const updateNewsletter: RequestHandler = async (req, res, next) => {
    const newsletterId = req.params.newsletterId;
    const { title, content, newsLetterOwnerId } = req.body;
    try {
        const updatedNewsletter = await newsletter.findByIdAndUpdate(
            newsletterId,
            { title, content, newsLetterOwnerId },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedNewsletter) {
            return res.status(404).json({ message: 'Newsletter non trouvée' });
        }

        res.status(200).json(updatedNewsletter);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /newsletters/{newsletterId}:
 *   delete:
 *     summary: Supprimer une newsletter
 *     tags: [Newsletters]
 *     parameters:
 *       - in: path
 *         name: newsletterId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la newsletter
 *     responses:
 *       200:
 *         description: Newsletter supprimée avec succès
 *       404:
 *         description: Newsletter non trouvée
 */
export const deleteNewsletter: RequestHandler = async (req, res, next) => {
    const newsletterId = req.params.newsletterId;
    try {
        const deletedNewsletter = await newsletter.findByIdAndDelete(newsletterId).exec();

        if (!deletedNewsletter) {
            return res.status(404).json({ message: 'Newsletter non trouvée' });
        }

        res.status(200).json({ message: 'Newsletter supprimée avec succès' });
    } catch (error) {
        next(error);
    }
};

export const saveNewsletter: RequestHandler = async (req, res, next) => {
    const { title, content, newsLetterOwnerId } = req.body;
    try {
        const existingNewsletter = await newsletter.findOne({
            title,
            newsLetterOwnerId,
        });

        if (existingNewsletter) {
            const updatedNewsletter = await newsletter.findByIdAndUpdate(
                existingNewsletter._id,
                { content },
                { new: true }
            );
            return res.status(200).json({ message: 'Newsletter mise à jour avec succès', updatedNewsletter });
        } else {
            const newNewsletter = await newsletter.create({
                title,
                content,
                newsLetterOwnerId,
            });
            return res.status(201).json({ message: 'Newsletter sauvegardée avec succès', newNewsletter });
        }
    } catch (error) {
        next(error);
    }
};
export const sendNewsletterEmail: RequestHandler = async (req, res, next) => {
    const { userEmail, subject, content } = req.body;

    try {
        const response = await sendEmail({ userEmail, subject, content });
        res.status(200).json({ message: 'Email envoyé avec succès !', response });
    } catch (error) {
        next(error)
    }
};