import express from 'express';
import { createPost, getFeedPosts, getUserPosts, likePost, updatePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts );
router.get('/find/:userId', verifyToken, getUserPosts );

/* POST */
router.post('/', verifyToken, createPost);

/* UPDATE */
router.put('/update/:id', verifyToken, updatePost );
router.patch('/like/:id', verifyToken, likePost );

export default router;