import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload);

  const populatedResult = (await Blog.findById(result._id).populate(
    'author',
    '_id email role',
  )) as IBlog;
  return populatedResult;
};

export const blogService = {
  createBlog,
};
