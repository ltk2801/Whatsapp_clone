import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chatSlice";
import { getConversationId } from "../../utils/chat";
import ChatAction from "./actions/ChatAction";

import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";

const ChatContainer = ({ onlineUsers }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { access_token } = user;

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(
        getConversationMessages({
          token: access_token,
          convo_id: activeConversation?._id,
        })
      );
    }
  }, [activeConversation, access_token, dispatch]);
  return (
    <div className="relative w-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* Chat Header */}
        <ChatHeader
          online={onlineUsers.find((u) =>
            u.userId === getConversationId(user, activeConversation.users)
              ? true
              : false
          )}
        />
        {/* Chat messages */}
        <ChatMessages />
        {/* Chat Action */}
        <ChatAction />
      </div>
    </div>
  );
};

export default ChatContainer;
