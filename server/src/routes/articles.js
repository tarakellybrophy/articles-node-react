import { Router } from 'express';
import passport from 'passport';

import { index, show, store } from '../controllers/articleController.js'

const articlesRouter = Router();   

articlesRouter.get('/', index);

articlesRouter.get('/:id', show);

articlesRouter.post('/', passport.authenticate('jwt', { session: false }), store);

export default articlesRouter;