import express from 'express';
import * as CommentController from '../controllers/comments.controller';

const router = express.Router();

router.get('/', CommentController.getComments);
router.get('/:commentId', CommentController.getComment);
router.post('/', CommentController.createComment);
router.put('/:commentId', CommentController.updateComment);
router.delete('/:commentId', CommentController.deleteComment);

export default router;
