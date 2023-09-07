import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUsers as searchUsersService } from "../services/userService.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    if (!keyword) {
      logger.error("Vui lòng nhập vào keyword");
      throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");
    }
    const users = await searchUsersService(keyword);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
