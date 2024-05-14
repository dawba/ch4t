import User from "../model/User";

export const getAllUsers = async () => {
  return User.find();
};

export const getUserById = async (id: string) => {
  return User.findById(id);
};

export const createUser = async (userData: any) => {
  const user = new User(userData);
  await user.save();

  return user;
};

export const updateUser = async (id: string, userData: any) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string) => {
  await User.findByIdAndDelete(id);
};
