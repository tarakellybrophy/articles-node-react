import { Router } from 'express';

import { 
    index, 
} from '../controllers/categoryController.js'

const categoriesRouter = Router();   

categoriesRouter.get('/', index);

export default categoriesRouter;