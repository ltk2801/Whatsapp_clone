import React from "react";
import { ArrowIcon } from "../../../svg";
import {
  BsTelephoneFill,
  BsFillCameraVideoFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import { VscUnmute } from "react-icons/vsc";

const CallAction = () => {
  return (
    <div className="h-22 w-full absolute bottom-0 z-40 px-1">
      {/* Container */}
      <div className="relative bg-[#222] px-4 pt-6 pb-12 rounded-xl">
        {/* Expand Icon */}
        <button className="-rotate-90 scale-y-[300%] absolute top-1 left-1/2">
          <ArrowIcon className="fill-dark_svg_2" />
        </button>
        {/* Actions */}
        <ul className="flex items-center justify-between">
          <li>
            <button className="btn_secondary">
              <VscUnmute className="fill-white h-[22px] w-[22px]" />
            </button>
          </li>
          <li>
            <button className="btn_secondary">
              <BsFillCameraVideoFill className="fill-white  h-[22px] w-[22px]  " />
            </button>
          </li>
          <li>
            <button className="btn_secondary">
              <BsFillMicMuteFill className="fill-white   h-[22px] w-[22px]" />
            </button>
          </li>
          <li>
            <button className="btn_secondary bg-red-600 rotate-[135deg]">
              <BsTelephoneFill className="fill-white  h-[22px] w-[22px]" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallAction;
