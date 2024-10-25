import express from 'express';
import * as BlogController from '../controllers/blogs.controller';

const router = express.Router();

// Route pour récupérer tous les blogs
router.get('/', BlogController.getAllBlogs);

// Route pour récupérer un blog spécifique par ID
router.get('/:id', BlogController.getBlogById);

// Route pour créer un nouveau blog
router.post('/', BlogController.createBlog);

// Route pour mettre à jour un blog spécifique par ID
router.put('/:id', BlogController.updateBlog);

// Route pour supprimer un blog spécifique par ID
router.delete('/:id', BlogController.deleteBlog);

// Route pour sauvegarder un blog ou mettre à jour un blog existant selon le contenu
router.post('/save', BlogController.saveBlog);

// Route pour obtenir les détails d'un blog via des paramètres de requête (query params)
router.get('/details', BlogController.getBlogDetails);

export default router;
