import config from '../../config';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  // return result;
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User is not found !');
  }

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new Error('User is blocked');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
