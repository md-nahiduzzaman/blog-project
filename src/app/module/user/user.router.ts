import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.post('/create-user', userController.createUser);
userRouter.get('/:id', userController.getSingleUser);
userRouter.get('/', userController.getUser);

export default userRouter;
