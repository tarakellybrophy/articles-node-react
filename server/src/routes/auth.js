import { Router } from 'express';

import { login, register, logout } from '../controllers/authController.js'

const authRouter = Router();   

authRouter.post('/login', login);

authRouter.post('/register', register);

authRouter.get('/logout', logout);

export default authRouter;