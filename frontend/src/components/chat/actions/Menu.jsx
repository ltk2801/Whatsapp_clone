import React from "react";
import { CameraIcon, ContactIcon, PollIcon, StickerIcon } from "../../../svg";
import DocAttachment from "./menuAttachments/DocAttachment";
import PhotoAttachment from "./menuAttachments/PhotoAttachment";

const Menu = () => {
  return (
    <ul className="absolute bottom-12 openEmojiAnimation">
      <li>
        <button type="button" className="rounded-full">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0EABF4] rounded-full">
          <ContactIcon />
        </button>
      </li>
      <DocAttachment />
      <li>
        <button type="button" className="bg-[#D3396D] rounded-full">
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachment />
    </ul>
  );
};

export default Menu;
