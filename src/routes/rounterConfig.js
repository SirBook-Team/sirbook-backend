import express from 'express';
import userRouter from './userRoutes.js';
import authRouter from './AuthRoutes.js';
import fileRouter from './fileRoutes.js';
import postRouter from './postRouters.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/files', fileRouter);
router.use('/posts', postRouter);

export default router;
