import React from "react";
import { useSelector } from "react-redux";

const FileViewer = ({ activeIndex }) => {
  const { files } = useSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%]">
      {/* Container */}
      <div className="flex justify-center items-center my-12">
        {files[activeIndex].type === "image" ? (
          <img
            src={files[activeIndex].fileData}
            alt={files[activeIndex].file.name}
            className="max-w-[80%] object-cover hview"
          />
        ) : files[activeIndex].type === "VIDEO" ? (
          <video
            src={files[activeIndex].fileData}
            controls
            className="max-w-[80%] object-cover hview"
          />
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            <img
              src={`../images/file/${files[activeIndex].type}.png`}
              alt={files[activeIndex].type}
            />
            {/* No preview text */}
            <h1 className="dark:text-dark_text_2 text-2xl">
              ( Không có bản xem trước )
            </h1>
            <h1 className="dark:text-dark_text_2 text-2xl">
              {files[activeIndex].file.name}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
