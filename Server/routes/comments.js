import express from 'express';
import { createComment, deleteComment, getComments } from '../controllers/comments.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ  */
router.get('/:postId', verifyToken, getComments );

/* POST */
router.post('/', verifyToken, createComment );

/* DELETE */
router.delete('/:id', verifyToken, deleteComment );

export default router;
