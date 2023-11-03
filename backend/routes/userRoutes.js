import express from 'express';
import * as user from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter
  .post('/users/register', user.createUserController)
  .post('/users/login', user.loginUserController)
  .post('/users/logout', user.logoutUserController)
  .get('/users/me/:id', user.getUserController)
  .get('/users/image-get', authMiddleware, user.getUserImage);

export default userRouter;
