import React from "react";
import { EmojiIcon } from "../../../svg";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useEffect } from "react";

const EmojiPickerComponent = ({
  textRef,
  message,
  setMessage,
  showPicker,
  setShowPicker,
  setShowAttachments,
}) => {
  const [cursorPosition, setCursorPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition, textRef]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);
    setShowPicker(false);
  };

  return (
    <li className="w-full">
      <button
        onClick={() => {
          setShowPicker((prev) => !prev);
          setShowAttachments(false);
        }}
        className="btn "
        type="button"
      >
        <EmojiIcon className="dark:fill-dark_svg_1" />
      </button>
      {/* Emoji picker */}
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default EmojiPickerComponent;
