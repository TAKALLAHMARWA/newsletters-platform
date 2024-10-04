import express from 'express';
import * as BlogController from '../controllers/blogs.controller';

const router = express.Router();

router.get('/', BlogController.getBlogs);
router.get('/:blogId', BlogController.getBlog);
router.post('/', BlogController.createBlog);
router.put('/:blogId', BlogController.updateBlog);
router.delete('/:blogId', BlogController.deleteBlog);

export default router;
