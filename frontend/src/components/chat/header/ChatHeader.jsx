import React from "react";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import SocketContext from "../../../context/SocketContext";
import { DotsIcon, SearchLargeIcon } from "../../../svg";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { capitalize } from "../../../utils/string";

import { FaVideo } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";

const ChatHeader = ({ online, callUser, socket }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  // const { name, picture } = activeConversation;

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-x-4">
          {/* Conversation image */}
          <button className="relative btn">
            <img
              src={
                activeConversation.isGroup
                  ? activeConversation.picture
                  : getConversationPicture(user, activeConversation.users)
              }
              alt="conversation pic"
              className="h-full w-full rounded-full object-cover"
            />
            {online ? (
              <GoDotFill className="absolute -bottom-2 -right-3 w-[32px] h-[32px] online z-auto" />
            ) : null}
          </button>
          {/* Conversation nmae and online status  */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {activeConversation.isGroup
                ? activeConversation.name
                : capitalize(
                    getConversationName(user, activeConversation.users)
                  )}
            </h1>
            <span className="text-sm dark:text-dark_svg_2">
              {online ? "Đang hoạt động" : ""}
            </span>
          </div>
        </div>
        {/* Right */}
        <ul className="flex items-center gap-x-2.5">
          {online ? (
            <li onClick={() => callUser()}>
              <button className="btn">
                <FaVideo className="dark:fill-dark_svg_1 w-[20px] h-[20px]" />
              </button>
            </li>
          ) : null}
          {online ? (
            <li>
              <button className="btn">
                <IoCallSharp className="dark:fill-dark_svg_1 w-[20px] h-[20px]" />
              </button>
            </li>
          ) : null}
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const ChatHeaderWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatHeader {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatHeaderWithSocket;
