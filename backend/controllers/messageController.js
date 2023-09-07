import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";

import {
  createMessage,
  populateMessage,
  getConvoMessages,
} from "../services/messageService.js";
import { updateLatestMessage } from "../services/conversationService.js";

export const sendMessage = async (req, res, next) => {
  try {
    // id của user đang đăng nhập
    const user_id = req.user.userId;
    // tin nhắn, file & id của cuộc trò chuyện
    const { message, convo_id, files } = req.body;
    if ((!message && !files) || !convo_id) {
      logger.error("Vui lòng nhập ID cuộc trò chuyện và nội dung gửi");
      throw createHttpError.BadRequest(
        "Oops... ID cuộc trò chuyện & nội dung gửi trống"
      );
    }
    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };
    const newMessage = await createMessage(msgData);

    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage);
    res.status(201).json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      logger.error("Vui lòng nhập ID cuộc trò chuyện ở params  ");
      throw createHttpError.BadRequest(
        "Oops... Không tìm ID cuộc trò chuyện ở params "
      );
    }
    const messages = await getConvoMessages(convo_id);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
