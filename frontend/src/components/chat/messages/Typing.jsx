import React from "react";
import { BeatLoader } from "react-spinners";

const Typing = ({ message }) => {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs `}>
      {/* Message Container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg dark:bg-dark_bg_2`}
        >
          {/* Typing animation */}
          <BeatLoader color="#fff" size={10} />
        </div>
      </div>
    </div>
  );
};

export default Typing;
