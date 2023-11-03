import { Router } from 'express';

import multerController from '../controller/multerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const multerRouter = Router();

multerRouter.post('/users/image-upload', authMiddleware, multerController);

export default multerRouter;
