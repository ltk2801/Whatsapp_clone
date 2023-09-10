import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chatSlice";
import { PhotoIcon } from "../../../../svg";

const PhotoAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const imageHandler = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((file) => {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "image/jpg" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/webm"
      ) {
        // Nếu file không nằm trong đuôi định dạng thì lọc ra.
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        // phân tích file
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // Đẩy file lên redux
        reader.onload = (e) => {
          dispatch(
            addFiles({
              file: file,
              fileData: e.target.result,
              type: file.type.split("/")[0],
            })
          );
        };
      }
    });
  };

  return (
    <li>
      <button
        type="button"
        className="bg-[#BF95CF] rounded-full"
        onClick={() => inputRef.current.click()}
      >
        <PhotoIcon />
        <input
          type="file"
          hidden
          ref={inputRef}
          accept="image/png,image/jpeg,image/gif,image/webp,image/jpg,video/mp4,video/mpeg,video/webm"
          onChange={imageHandler}
        />
      </button>
    </li>
  );
};

export default PhotoAttachment;
