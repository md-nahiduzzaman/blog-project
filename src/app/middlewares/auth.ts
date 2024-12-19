import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../module/user/user.model';
import { TUserRole } from '../module/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User is not found');
    }

    const userStatus = user?.isBlocked;

    if (userStatus === true) {
      throw new Error('User is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized');
    }

    // req.user = decoded as JwtPayload;
    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    next();
  });
};

export default auth;
