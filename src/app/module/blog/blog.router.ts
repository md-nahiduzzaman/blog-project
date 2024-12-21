import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';

const blogRouter = Router();

blogRouter.post('/', auth(USER_ROLE.user), blogController.createBlog);
blogRouter.patch('/:id', auth(USER_ROLE.user), blogController.updateBlog);
blogRouter.delete('/:id', auth(USER_ROLE.user), blogController.deleteBlog);
blogRouter.get('/', blogController.getBlogs);

export default blogRouter;
