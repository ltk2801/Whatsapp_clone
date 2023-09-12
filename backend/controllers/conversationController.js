import logger from "../configs/logger.config.js";
import createHttpError from "http-errors";
import {
  createConversation,
  doesConversationExist,
  populateConversation,
  getUserConversations,
} from "../services/conversationService.js";
import { findUser } from "../services/userService.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;
    const { receiver_id, isGroup } = req.body;
    if (isGroup == false) {
      // check if receiver_id is provided
      if (!receiver_id) {
        logger.error(
          "Vui lòng cung cấp id người dùng mà bạn muốn bắt đầu cuộc trò chuyện !"
        );
        throw createHttpError.BadGateway("Đã có lỗi xảy ra !");
      }
      // check if chat exists
      const existed_conversation = await doesConversationExist(
        sender_id,
        receiver_id,
        false
      );
      // Nếu tồn tại cuộc trò chuyện thì trả về cuộc trò chuyện đó, còn không thì sẽ tạo mới
      if (existed_conversation) {
        res.status(200).json(existed_conversation);
      } else {
        //  const receiver_user = await findUser(receiver_id);
        const convoData = {
          name: "conversation name",
          picture: "covnersation picture",
          isGroup: false,
          users: [sender_id, receiver_id],
        };
        const newConvo = await createConversation(convoData);
        const populatedConvo = await populateConversation(
          newConvo._id,
          "users",
          "-password"
        );
        res.status(200).json(populatedConvo);
      }
    } else {
      // it's a group chat
      // check if chat exists
      const existed_group_conversation = await doesConversationExist(
        "",
        "",
        isGroup
      );
      res.status(200).json(existed_group_conversation);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export const createGroup = async (req, res, next) => {
  const { name, users } = req.body;

  try {
    // add current user to users
    users.push(req.user.userId);
    if (!name || !users) {
      throw createHttpError.BadRequest("Vui lòng nhập vào đầy đủ thông tin");
    }
    if (users.length <= 2) {
      throw createHttpError.BadRequest("Nhóm chat phải từ 3 người trở lên");
    }
    let convoData = {
      name,
      users,
      isGroup: true,
      admin: req.user.userId,
      picture: process.env.DEFAULT_PICTURE_GROUP,
    };
    const newConvo = await createConversation(convoData);
    const populatedConvo = await populateConversation(
      newConvo._id,
      "users admin",
      "-password"
    );
    res.status(200).json(populatedConvo);
  } catch (error) {
    next(error);
  }
};
