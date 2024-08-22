import { RequestHandler } from 'express';
import Blog from '../models/blogs.model';

export const getBlogs: RequestHandler = async (req, res, next) => {
    try {
        const blogs = await Blog.find().exec();
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};

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

export const createBlog: RequestHandler = async (req, res, next) => {
    const { userId, content, title, image, category, slug } = req.body;
    try {
        const newBlog = await Blog.create({
            userId,
            content,
            title,
            image,
            category,
            slug
        });
        res.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
};
