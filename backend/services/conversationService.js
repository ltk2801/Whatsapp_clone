import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

export const doesConversationExist = async (
  sender_id,
  receiver_id,
  isGroup
) => {
  if (isGroup === false) {
    // tìm kiếm xem cuộc trò chuyện giữa người gửi và người nhận có tồn tại hay không
    let convos = await ConversationModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender_id } } },
        { users: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (!convos) throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");

    // populate message model
    // Nối thông tin của trường "latestMessage.sender" trong mô hình, nghĩa là ở trường latesestMessage vô trường sender lấy hết thông tin của người gửi
    convos = await UserModel.populate(convos, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return convos[0];
  } else {
    // it's a group

    // tìm kiếm xem cuộc trò chuyện giữa người gửi và người nhận có tồn tại hay không
    let convo = await ConversationModel.find({ _id: isGroup })
      .populate("users admin", "-password")
      .populate("latestMessage");

    if (!convo) throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");

    // populate message model
    // Nối thông tin của trường "latestMessage.sender" trong mô hình, nghĩa là ở trường latesestMessage vô trường sender lấy hết thông tin của người gửi
    convo = await UserModel.populate(convo, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });
    return convo[0];
  }
};

export const createConversation = async (data) => {
  const newConvo = await ConversationModel.create(data);
  if (!newConvo) throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldsToRemove
) => {
  const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");
  return populatedConvo;
};

export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModel.find({ users: { $elemMatch: { $eq: user_id } } })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = results;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");
    });
  return conversations;
};

export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo) {
    throw createHttpError.BadRequest("Oops... Đã có lỗi xảy ra !");
  }
  return updatedConvo;
};
