import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcryptjs from "bcryptjs";

const { DEFAULT_STATUS, DEFAULT_PICTURE } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  // check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Vui lòng nhập đầy đủ thông tin");
  }

  // check name length
  if (!validator.isLength(name, { min: 2, max: 45 })) {
    throw createHttpError.BadRequest(
      "Họ và tên phải nhiều hơn 2 và ít hơn 45 ký tự"
    );
  }

  // check status length
  if (status && status.length > 64) {
    throw createHttpError.BadRequest("Trạng thái phải ít hơn 64 ký tự");
  }

  // check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Địa chỉ email không chính xác");
  }
  // check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Địa chỉ email đã được sử dụng ! Vui lòng sử dụng địa chỉ email khác"
    );
  }
  // check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Mật khẩu phải nhiều hơn 6 và ít hơn 128 ký tự"
    );
  }
  // hash passwrod -> to be done in the user model

  // adding user to database
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  // check if user exist
  if (!user) {
    throw createHttpError.NotFound("Email không tồn tại trong hệ thống");
  }

  // compare passwords
  const passwordMatches = await bcryptjs.compare(password, user.password);
  if (!passwordMatches) {
    throw createHttpError.NotFound("Mật khẩu không đúng ");
  }
  return user;
};
