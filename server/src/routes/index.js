import { Router } from 'express';
import authRouter from './auth.js';
import articlesRouter from './articles.js';
import categoriesRouter from './categories.js';
import tagsRouter from './tags.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/articles', articlesRouter);
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);

export default router;