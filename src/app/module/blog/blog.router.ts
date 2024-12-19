import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const blogRouter = Router();

blogRouter.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.createBlog,
);

export default blogRouter;
