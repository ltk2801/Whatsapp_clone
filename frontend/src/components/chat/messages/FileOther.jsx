import React from "react";
import { FiDownload } from "react-icons/fi";

const FileOther = ({ file, type }) => {
  return (
    <div className="bg-green_4 p-2 rounded-lg">
      {/* Container */}
      <div className="flex justify-between gap-x-8">
        {/* File infos */}
        <div className="flex items-center gap-2">
          <img
            src={`../images/file/${type}.png`}
            alt="file"
            className="w-10 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h1>
              {file.original_filename}.{type.toLowerCase()}
            </h1>
          </div>
        </div>
        {/* Download button */}
        <a
          href={file.secure_url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="cursor-pointer"
        >
          <FiDownload />
        </a>
      </div>
    </div>
  );
};

export default FileOther;
