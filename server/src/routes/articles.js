import { Router } from 'express';
import passport from 'passport';

import {
    validateNewArticle,
    validateArticleId,
    validateArticleUpdate
} from '../middleware/validation/article.js';

import {
    index,
    show,
    store,
    update,
    remove,
    comment_store
} from '../controllers/articleController.js'

const articlesRouter = Router();

articlesRouter.get('/', index);

articlesRouter.get('/:id', validateArticleId, show);

articlesRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    validateNewArticle,
    store
);

articlesRouter.put('/:id',
    passport.authenticate('jwt', { session: false }),
    validateArticleId,
    validateArticleUpdate,
    update
);

articlesRouter.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validateArticleId,
    remove
);

articlesRouter.delete('/:id', validateArticleId, remove);

articlesRouter.post('/:id/comments',
    passport.authenticate('jwt', { session: false }),
    comment_store
);

// articlesRouter.put('/:id/comments/:cid',
//     passport.authenticate('jwt', { session: false }),
//     comment_update
// );
//
// articlesRouter.delete('/:id/comments/:cid',
//     passport.authenticate('jwt', { session: false }),
//     comment_delete
// );

export default articlesRouter;
