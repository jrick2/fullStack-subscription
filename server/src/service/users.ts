import UserModel, { User } from "../models/users";

export const createUser = (input: Partial<User>) => {
  return UserModel.create(input);
};
