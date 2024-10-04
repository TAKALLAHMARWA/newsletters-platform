import { RequestHandler } from 'express';
import Blog from '../models/blogs.model';

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API pour la gestion des blogs
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Récupérer tous les blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: La liste des blogs
 *         content:
 *           application/json:
 *             schema:q
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
export const getBlogs: RequestHandler = async (req, res, next) => {
    try {
        const blogs = await Blog.find().exec();
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Récupérer un blog par ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du blog
 *     responses:
 *       200:
 *         description: Le blog correspondant à l'ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog non trouvé
 */
export const getBlog: RequestHandler = async (req, res, next) => {
    const blogId = req.params.blogId;
    try {
        const blog = await Blog.findById(blogId).exec();
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Créer un nouveau blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Requête invalide
 */
export const createBlog: RequestHandler = async (req, res, next) => {
    const { userId, content, title, image, category } = req.body;
    try {
        const newBlog = await Blog.create({
            userId,
            content,
            title,
            image,
            category,
        });
        res.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Mettre à jour un blog existant
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog non trouvé
 *       400:
 *         description: Requête invalide
 */
export const updateBlog: RequestHandler = async (req, res, next) => {
    const blogId = req.params.blogId;
    const { userId, content, title, image, category } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { userId, content, title, image, category },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        next(error);
    }
};

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Supprimer un blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du blog
 *     responses:
 *       200:
 *         description: Blog supprimé avec succès
 *       404:
 *         description: Blog non trouvé
 */
export const deleteBlog: RequestHandler = async (req, res, next) => {
    const blogId = req.params.blogId;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(blogId).exec();

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        next(error);
    }
};
