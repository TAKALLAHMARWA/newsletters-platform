import { RequestHandler } from 'express';
import Comment from '../models/comments.model';

export const getComments: RequestHandler = async (req, res, next) => {
    try {
        const comments = await Comment.find().exec();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

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

export const createComment: RequestHandler = async (req, res, next) => {
    const { content, postId, userId, likes, numberOfLikes } = req.body;
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
