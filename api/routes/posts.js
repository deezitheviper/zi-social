import express from 'express';
import { addPost, getPosts } from '../controllers/post.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/add', addPost);

export default router