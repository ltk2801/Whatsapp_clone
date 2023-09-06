import React, { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
  const inputRef = useRef();
  const [error, setError] = useState("");

  const handlePicture = (e) => {
    const picture = e.target.files[0];
    if (picture) {
      if (
        picture?.type !== "image/jpeg" &&
        picture?.type !== "image/png" &&
        picture?.type !== "image/webp"
      ) {
        setError(`"${picture?.name}" định dạng file không được hỗ trợ`);
        return;
      } else if (picture.size > 1024 * 1024 * 5) {
        // 5mb
        setError(`"${picture?.name}" kích thước file quá lớn (Tối đa 5MB) `);
        return;
      } else {
        // console.log(picture) file ảnh ;
        setPicture(picture);
        // reading the picture
        const reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onload = (e) => {
          setReadablePicture(e.target.result);
        };
        setError("");
      }
    }
  };
  const handleRemovePice = () => {
    setReadablePicture("");
    setPicture("");
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide ">
        Ảnh đại diện (Không bắt buộc)
      </label>
      {readablePicture ? (
        <div className="relative">
          <img
            src={readablePicture}
            alt="image_user"
            className="w-20 h-20 object-cover rounded-full my-3 "
          />
          <LuImagePlus
            className="text-green_1 absolute bottom-1 left-24  w-[26px] h-[26px] hover:cursor-pointer"
            onClick={() => inputRef.current.click()}
          />
          <TiDeleteOutline
            className="text-green_1 absolute top-0 left-16  w-[20px] h-[20px] hover:cursor-pointer"
            onClick={() => handleRemovePice()}
          />
        </div>
      ) : (
        <div
          // click vào state chứa inputRef
          onClick={() => inputRef.current.click()}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
        >
          Tải ảnh đại diện
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handlePicture}
      />
      {/* error */}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default Picture;
