import { Types } from 'mongoose';
import { IBlog } from './blog.interface';
import Blog from './blog.model';
import QueryBuilder from '../../builder/queryBuilder';

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload);

  const populatedResult = (await Blog.findById(result._id).populate(
    'author',
    '_id email role',
  )) as IBlog;
  return populatedResult;
};

const updateBlog = async (
  blogId: string,
  authorId: string,
  updateData: Partial<IBlog>,
): Promise<IBlog> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new Error('Invalid Blog ID');
  }

  if (!Types.ObjectId.isValid(authorId)) {
    throw new Error('Invalid User ID');
  }

  const result = await Blog.findOneAndUpdate(
    { _id: blogId, author: authorId },
    { $set: updateData },
    { new: true },
  ).populate('author', '_id email role');

  if (!result) {
    throw new Error(
      'Blog not found or you are not authorized to update this blog',
    );
  }

  return result;
};

const deleteBlog = async (blogId: string, authorId: string): Promise<void> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new Error('Invalid Blog ID');
  }

  const result = await Blog.findOneAndDelete({
    _id: blogId,
    author: authorId,
  });

  if (!result) {
    throw new Error('Blog not found or not authorized to delete this blog');
  }
};

// const getBlogs = async (query: Record<string, unknown>) => {
//   const searchableFields = ['title', 'content'];

//   const blogs = new QueryBuilder(Blog.find(), query)
//     .search(searchableFields)
//     .filter()
//     .sort();

//   const result = await blogs.modelQuery
//     .populate('author', '_id email role')
//     .exec();

//   return result;
// };

const getBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];

  const blogs = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await blogs.modelQuery;
  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
