import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chatSlice";
import { CloseIcon } from "../../../../svg";
import { getFileType } from "../../../../utils/file";

const Add = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const fileHandler = (e) => {
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
        file.type !== "video/webm" &&
        file.type !== "application/pdf" &&
        file.type !== "application/msword" &&
        file.type !== "text/plain" &&
        file.type !== "audio/mpeg" &&
        file.type !== "audio/wav" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip"
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
              fileData:
                getFileType(file.type) === "image" ? e.target.result : "",
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <>
      <div
        className="w-14 h-14 border dark:border-white rounded-md flex items-center justify-center cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/*,image/png,image/jpeg,image/gif,image/webp,image/jpg,video/mp4,video/mpeg,video/webm"
        onChange={fileHandler}
      />
    </>
  );
};

export default Add;
