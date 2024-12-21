import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

const getUser = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const userService = {
  createUser,
  getUser,
  getSingleUser,
};
