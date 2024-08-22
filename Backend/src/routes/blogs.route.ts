import express from 'express';
import * as BlogController from '../controllers/blogs.controller';

const router = express.Router();

router.get('/', BlogController.getBlogs);
router.get('/:blogId', BlogController.getBlog);
router.post('/', BlogController.createBlog);

export default router;
