import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';

// create blog
const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  const author = req.user;

  if (!author) {
    throw new Error('Author information is missing');
  }

  const result = await blogService.createBlog({ ...payload, author });

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// update blog
const updateBlog = catchAsync(async (req, res) => {
  const updateData = req.body;
  const blogId = req.params.id;
  const authorId = req.user._id;

  const result = await blogService.updateBlog(blogId, authorId, updateData);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;
  const authorId = req.user._id;

  await blogService.deleteBlog(blogId, authorId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: {},
  });
});

// get blogs with queries
const getBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getBlogs(req.query);

  if (result.length === 0) {
    return sendResponse(res, {
      success: true,
      message: 'No blogs found',
      statusCode: StatusCodes.OK,
      data: [],
    });
  }

  return sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
    })),
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
};
