import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SocketContext from "../../../context/SocketContext";

const InputAction = ({ message, setMessage, textRef, socket }) => {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);
  let typingInterval;
  let timer = 3000;

  const onChangeHandler = (e) => {
    setMessage(e.target.value);

    // Typing
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }
    // Xóa hàm hẹn giờ kiểm tra typing trước khi tạo một cái mới
    clearInterval(typingInterval);

    // Tạo hàm hẹn giờ kiểm tra typing mới
    typingInterval = setInterval(() => {
      if (typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
        clearInterval(typingInterval); // Xóa hàm hẹn giờ sau khi gửi "stop typing"
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
