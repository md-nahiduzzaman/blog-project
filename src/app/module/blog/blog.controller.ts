import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';

const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  const author = req.user;

  if (!author) {
    throw new Error('Author information is missing');
  }

  const result = await blogService.createBlog({ ...payload, author });

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const blogController = {
  createBlog,
};
