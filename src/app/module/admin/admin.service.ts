import Blog from '../blog/blog.model';
import User from '../user/user.model';

// block user service
const blockUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const result = await User.findByIdAndUpdate(userId, { isBlocked: true });
  return result;
};

// delete blog service
const deleteBlog = async (id: string) => {
  const result = Blog.findByIdAndDelete(id);
  return result;
};

export const adminService = {
  blockUser,
  deleteBlog,
};
