import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';

// block user controller
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await adminService.blockUser(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});

// delete blog controller
const deleteBlog = catchAsync(async (req, res) => {
  await adminService.deleteBlog(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
