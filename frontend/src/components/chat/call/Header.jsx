import React from "react";
import { ArrowIcon, LockIcon } from "../../../svg";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const Header = () => {
  return (
    <header className="absolute top-0 w-full z-40">
      {/* Header container */}
      <div className="p-1 flex items-center justify-between">
        {/* Return button */}
        <button className="btn">
          <span className="rotate-180 scale-150">
            <ArrowIcon className="fill-white" />
          </span>
        </button>
        {/* End to end encrypted text */}
        <p className="flex items-center">
          <LockIcon className="fill-white scale-75" />
          <span className="text-xs text-white">Được mã hóa đầu cuối</span>
        </p>
        {/* Add contact to call */}
        <button className="btn">
          <AiOutlineUsergroupAdd className="fill-white scale-150" />
        </button>
      </div>
    </header>
  );
};

export default Header;
