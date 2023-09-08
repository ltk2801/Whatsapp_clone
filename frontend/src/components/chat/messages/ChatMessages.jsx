import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358279/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      {/* Container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {messages &&
          messages.map((message) => (
            <Messages
              message={message}
              key={message?._id}
              me={user?._id === message?.sender?._id}
            />
          ))}
        <span ref={endRef}></span>
      </div>
    </div>
  );
};

export default ChatMessages;
