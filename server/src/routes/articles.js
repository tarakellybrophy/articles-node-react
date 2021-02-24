import { Router } from 'express';

import { index, show } from '../controllers/articleController.js'

const articlesRouter = Router();   

articlesRouter.get('/', index);

articlesRouter.get('/:id', show);

export default articlesRouter;