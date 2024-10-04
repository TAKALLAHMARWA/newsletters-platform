import { RequestHandler } from 'express';
import Comment from '../models/comments.model';

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API pour la gestion des commentaires
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupérer tous les commentaires
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: La liste des commentaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
export const getComments: RequestHandler = async (req, res, next) => {
    try {
        const comments = await Comment.find().exec();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     summary: Récupérer un commentaire par ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Le commentaire correspondant à l'ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Commentaire non trouvé
 */
export const getComment: RequestHandler = async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        const comment = await Comment.findById(commentId).exec();
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Créer un nouveau commentaire
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Requête invalide
 */
export const createComment: RequestHandler = async (req, res, next) => {
    const { content, postId, userId,likes, numberOfLikes } = req.body;
    try {
        const newComment = await Comment.create({
            content,
            postId,
            userId,
            likes,
            numberOfLikes
        });
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: Mettre à jour un commentaire existant
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Commentaire non trouvé
 *       400:
 *         description: Requête invalide
 */
export const updateComment: RequestHandler = async (req, res, next) => {
    const commentId = req.params.commentId;
    const { content, postId, userId, likes, numberOfLikes } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content, postId, userId, likes, numberOfLikes },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
export const deleteComment: RequestHandler = async (req, res, next) => {
    const commentId = req.params.commentId;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId).exec();

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
};
