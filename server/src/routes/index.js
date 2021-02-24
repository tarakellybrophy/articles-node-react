import { Router } from 'express';
import passport from 'passport';
import authRouter from './auth.js';
import articlesRouter from './articles.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);

export default router;