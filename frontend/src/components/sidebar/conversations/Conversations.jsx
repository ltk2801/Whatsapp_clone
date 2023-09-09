import React from "react";
import { useSelector } from "react-redux";
import { getConversationId } from "../../../utils/chat";
import Conversation from "./Conversation";

const Conversations = ({ onlineUsers, typing }) => {
  const { conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            // .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((convo) => {
              // check user đang online
              let check = onlineUsers.find(
                (u) => u.userId === getConversationId(user, convo.users)
              );
              return (
                <Conversation
                  convo={convo}
                  key={convo._id}
                  online={check ? true : false}
                  typing={typing}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
