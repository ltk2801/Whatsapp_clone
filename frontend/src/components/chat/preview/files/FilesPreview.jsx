import React, { useState } from "react";
import FileViewer from "./FileViewer";
import HandlerAndSend from "./HandlerAndSend";
import Header from "./Header";
import Input from "./Input";

const FilesPreview = () => {
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative py-2 w-full flex items-center justify-center">
      {/* Container */}
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <Header activeIndex={activeIndex} />
        {/* Viewing selected file */}
        <FileViewer activeIndex={activeIndex} />
        <div className="w-full flex flex-col items-center">
          {/* Message Input */}
          <Input message={message} setMessage={setMessage} />
          {/* Send and manipulate files */}
          <HandlerAndSend
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            message={message}
          />
        </div>
      </div>
    </div>
  );
};

export default FilesPreview;
