import { RequestHandler } from 'express';
import Blog from '../models/blogs.model';  // Le modèle que tu as défini

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Récupérer tous les articles de blog
 *     tags: [Blogs]
 */
export const getAllBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
}; 

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Créer un nouvel article de blog
 *     tags: [Blogs]
 */
export const createBlog: RequestHandler = async (req, res, next) => {
  const { title, content, blogonwerId, image, category } = req.body;
  try {
    const newBlog = await Blog.create({ title, content, blogonwerId, image, category });
    res.status(201).json(newBlog);
  } catch (error) {

    next(error);
  }
};

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Récupérer un article de blog par ID
 *     tags: [Blogs]
 */
export const getBlogById: RequestHandler = async (req, res, next) => {
  const blogonwerId = req.query;
  try {
    const blog = await Blog.findById(blogonwerId);
    if (!blog) return res.status(404).json({ message: 'Blog non trouvé' });
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Mettre à jour un article de blog
 *     tags: [Blogs]
 */
export const updateBlog: RequestHandler = async (req, res, next) => {
   const BlogId = req.params.newsletterId;
  const { title, content, blogonwerId, image, category } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(BlogId , { title, content, blogonwerId, image, category }, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog non trouvé' });
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Supprimer un article de blog
 *     tags: [Blogs]
 */
export const deleteBlog: RequestHandler = async (req, res, next) => {
  const BlogId = req.params.newsletterId;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(BlogId).exec();
    
    if (!deletedBlog) return res.status(404).json({ message: 'Blog non trouvé' });
    res.status(200).json({ message: 'Blog supprimé avec succès' });
  } 
  catch (error) {
    next(error);
  }
};
export const saveBlog: RequestHandler = async (req, res, next) => {
  const { title, content, newsLetterOwnerId, image, category} = req.body;
  try {
      const existingBlog = await Blog.findOne({
        title, content, newsLetterOwnerId, image, category
      });

      if (existingBlog) {
          const updatedblog = await Blog.findByIdAndUpdate(
            existingBlog._id,
              { content,image,category },
              { new: true }
          );
          return res.status(200).json({ message: 'blog mise à jour avec succès', updatedblog});
      } else {
          const newblog = await Blog.create({
            title, content, newsLetterOwnerId, image, category
          });
          return res.status(201).json({ message: 'blog sauvegardée avec succès', newblog });
      }
  } catch (error) {
      next(error);

  }
};
export const getBlogDetails: RequestHandler = async (req, res, next) => {
  const { title,   image,newsLetterOwnerId } = req.query;
  try {
      const foundBlog = await Blog.findOne({
          title,
          image,
          newsLetterOwnerId,
      });

      if (!foundBlog) {
          return res.status(404).json({ message: 'Newsletter non trouvée' });
      }

      res.status(200).json(foundBlog);
  } catch (error) {
      next(error);
  }
};

