import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessages } from "../../../features/chatSlice";
import { SendIcon } from "../../../svg";
import Attachments from "./Attachments";
import EmojiPickerComponent from "./EmojiPickerComponent";
import InputAction from "./InputAction";
import { ClipLoader } from "react-spinners";

const ChatAction = () => {
  const [message, setMessage] = useState("");
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { access_token } = user;
  const dispatch = useDispatch();
  const textRef = useRef();

  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [loading, setLoading] = useState(false);

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token: access_token,
  };

  const SendMessageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendMessages(values));
    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={(e) => SendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/* Container */}
      <div className="w-full flex items-center gap-x-2">
        {/* Emojis and attachpments */}
        <ul className="flex gap-x-2">
          <EmojiPickerComponent
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowPicker={setShowPicker}
          />
        </ul>
        {/* Input */}
        <InputAction
          message={message}
          setMessage={setMessage}
          textRef={textRef}
        />
        {/* Send button */}
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_2" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatAction;
