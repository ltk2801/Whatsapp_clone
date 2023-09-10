import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import SocketContext from "../../../../context/SocketContext";
import {
  removeFileFromFiles,
  sendMessages,
} from "../../../../features/chatSlice";
import { SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/uploadFile";
import Add from "./Add";
import { FaTrash } from "react-icons/fa";
import VideoThumbnail from "react-video-thumbnail";

const HandlerAndSend = ({ setActiveIndex, activeIndex, message, socket }) => {
  const dispatch = useDispatch();
  const { files, status, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);
  const { access_token } = user;

  // send message & file handler
  const sendMessageHandler = async (e) => {
    // console.log(files, message);
    e.preventDefault();
    // upload files first to cloudy
    const uploaded_files = await uploadFiles(files);
    // send the message
    const values = {
      token: access_token,
      message,
      convo_id: activeConversation._id,
      files: uploaded_files.length > 0 ? uploaded_files : [],
    };
    let newMsg = await dispatch(sendMessages(values));
    socket.emit("send message", newMsg.payload);
  };
  // remove file handler
  const handleRemoveFile = (index) => {
    dispatch(removeFileFromFiles(index));
  };
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      {/* Empty */}
      <span></span>
      {/* List files */}
      <div className="flex gap-x-2 mt-4">
        {files.map((file, i) => (
          <div
            className=" relative flex flex-col justify-center items-center gap-1"
            key={i}
          >
            <div
              className={`fileThumbnail w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer transform transition-transform duration-300 ease-in-out  ${
                activeIndex === i ? "border-[3px] !border-green_1" : ""
              }`}
              onClick={() => setActiveIndex(i)}
            >
              {file.type === "image" ? (
                <img
                  src={file.fileData}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : file.type === "VIDEO" ? (
                <VideoThumbnail videoUrl={file.fileData} />
              ) : (
                <img
                  src={`../images/file/${file.type}.png`}
                  alt={file.name}
                  className="w-8 h-10 mt-1.5 ml-2.5"
                />
              )}
            </div>
            {/* Remove file icon */}
            <FaTrash
              onClick={() => handleRemoveFile(i)}
              className={`removeFileIcon cursor-pointer  dark:fill-red_1 absolute -bottom-6 ${
                activeIndex === i ? "block" : "hidden"
              }`}
            />
          </div>
        ))}
        {/* Add another file */}
        {<Add setActiveIndex={setActiveIndex} />}
      </div>
      {/* Send button */}
      <div
        onClick={(e) => sendMessageHandler(e)}
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  );
};
const HandlerAndSendWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandlerAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HandlerAndSendWithSocket;
