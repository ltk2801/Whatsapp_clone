import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SocketContext from "../../../context/SocketContext";

const InputAction = ({ message, setMessage, textRef, socket }) => {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    // Typing
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    // Stop typing
    let lastTypingTime = new Date().getTime();
    let timer = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Nhập văn bản"
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      />
    </div>
  );
};

const InputActionWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <InputAction {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default InputActionWithSocket;
