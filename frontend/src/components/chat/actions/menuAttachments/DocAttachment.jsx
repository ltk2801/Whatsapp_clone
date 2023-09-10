import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chatSlice";
import { DocumentIcon } from "../../../../svg";

const DocAttachment = () => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const documentHandler = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((file) => {
      if (
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
              type: file.type.split("/")[1],
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
        className="bg-[#5F66CD] rounded-full"
        onClick={() => inputRef.current.click()}
      >
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        ref={inputRef}
        accept="application/*,text/*,audio/*"
        onChange={documentHandler}
      />
    </li>
  );
};

export default DocAttachment;
