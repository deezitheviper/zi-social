import express from 'express';
import { addLike, getLikes, removeLike } from '../controllers/like.js';

const router = express.Router();

router.get('/', getLikes)
router.post('/add', addLike)
router.delete('/:postId', removeLike)

export default router