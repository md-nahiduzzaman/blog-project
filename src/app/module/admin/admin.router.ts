import { Router } from 'express';
import { adminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const adminRouter = Router();

adminRouter.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminController.blockUser,
);

adminRouter.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  adminController.deleteBlog,
);

export default adminRouter;
