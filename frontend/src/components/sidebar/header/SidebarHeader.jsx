import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from "../../../svg";
import { capitalize } from "../../../utils/string";
import { GoDotFill } from "react-icons/go";
import Menu from "./Menu";
import CreateGroup from "./createGroup/CreateGroup";

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.user);

  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  return (
    <>
      {/* SideBar Header */}
      <div className="h-[54px] dark:bg-dark_bg_2 flex items-center p16">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
          {/* user image */}
          <div className="flex items-center justify-center gap-5">
            <button className="btn relative">
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-full w-full h-full object-cover"
              />
              <GoDotFill className="absolute -bottom-2 -right-3 w-[28px] h-[28px] online z-auto" />
            </button>
            <h1 className="font-bold text-md text-white">
              {" "}
              {capitalize(user.name)}
            </h1>
          </div>

          {/* user icons */}
          <ul className="flex items-center gap-x-2 5">
            <li>
              <button className="btn">
                <CommunityIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <StoryIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <ChatIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li
              className="relative"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}>
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              {showMenu ? (
                <Menu setShowCreateGroup={setShowCreateGroup} />
              ) : null}
            </li>
          </ul>
        </div>
      </div>
      {/* Create Group */}
      {showCreateGroup && (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      )}
    </>
  );
};

export default SidebarHeader;
