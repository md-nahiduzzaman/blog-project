import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: StatusCodes.ACCEPTED,
    token: result?.token,
    data: result?.user,
  });
});

export const AuthControllers = {
  register,
  login,
};
