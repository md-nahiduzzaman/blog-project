import { Router } from 'express';
import { AuthControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

const AuthRouter = Router();

AuthRouter.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.register,
);
AuthRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

export default AuthRouter;
