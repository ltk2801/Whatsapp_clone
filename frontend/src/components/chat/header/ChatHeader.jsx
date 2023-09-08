import React from "react";
import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";

const ChatHeader = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-x-4">
          {/* Conversation image */}
          <button className="btn">
            <img
              src={picture}
              alt={`${name}`}
              className="h-full w-full rounded-full object-cover"
            />
          </button>
          {/* Conversation nmae and online status  */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {capitalize(name)}
            </h1>
            <span className="text-sm dark:text-dark_svg_2">Đang hoạt động</span>
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
