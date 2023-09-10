import moment from "moment";
import React from "react";
import FileImageVideo from "./FileImageVideo";
import FileOther from "./FileOther";

const FileMessage = ({ fileMessage, message, me }) => {
  const { file, type } = fileMessage;

  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* Message Container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 rounded-lg ${
            me ? "bg-green_3 " : "dark:bg-dark_bg_2"
          } ${
            me && file.public_id.split(".")[1] === "png"
              ? "bg-white"
              : "bg-green_3"
          }`}
        >
          {/* Message */}
          <div
            className={`h-full text-sm ${
              type !== "image" && type !== "VIDEO" ? "p-1 pb-5" : ""
            } `}
          >
            {type === "image" || type === "VIDEO" ? (
              <FileImageVideo url={file.secure_url} type={type} />
            ) : (
              <FileOther file={file} type={type} />
            )}
          </div>
          {/* Message Dare */}
          <span className="absolute right-1.5 bottom-1.5  text-xs  text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {/* Traingle */}
          {/* {!me ? (
        <span>
          <TraingleIcon className="dark:fill-dark_bg_2 !rotate-[60deg] absolute top-[-5px] -left-1.5 w-4 h-4 text-gray-500" />
        </span>
      ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default FileMessage;
