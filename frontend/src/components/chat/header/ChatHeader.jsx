import React from "react";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg";
import {
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { capitalize } from "../../../utils/string";

const ChatHeader = ({ online }) => {
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
              src={getConversationPicture(user, activeConversation.users)}
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
              {capitalize(getConversationName(user, activeConversation.users))}
            </h1>
            <span className="text-sm dark:text-dark_svg_2">
              {online ? "Đang hoạt động" : ""}
            </span>
          </div>
        </div>
        {/* Right */}
        <ul className="flex items-center gap-x-2.5">
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

export default ChatHeader;
