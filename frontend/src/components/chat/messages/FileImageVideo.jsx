import React from "react";

const FileImageVideo = ({ url, type }) => {
  return (
    <div>
      {type === "image" ? (
        <img
          src={url}
          alt="img"
          className="cursor-pointer rounded-lg object-cover"
        />
      ) : (
        <video src={url} controls className="cursor-pointer rounded-lg" />
      )}
    </div>
  );
};

export default FileImageVideo;
