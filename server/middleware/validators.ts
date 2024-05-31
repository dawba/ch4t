import mongoose from "mongoose";

export const validateMongoId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateEmail = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};
