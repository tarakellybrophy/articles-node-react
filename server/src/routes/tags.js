import { Router } from 'express';

import { 
    index, 
} from '../controllers/tagController.js'

const tagsRouter = Router();   

tagsRouter.get('/', index);

export default tagsRouter;