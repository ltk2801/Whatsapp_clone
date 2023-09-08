import React from "react";
import { Logo } from "../../../svg";

const WhatsappHome = () => {
  return (
    <div className=" w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
      {/* {Container} */}
      <div className="mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center ">
        <span>
          <Logo />
        </span>
        {/* Infos */}
        <div className="mt-1 text-center space-y-[12px]">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            Whatsapp Web
          </h1>
          <p className="text-sm dark:text-dark_text_3">
            Trò chuyện và gửi nhận tin nhắn mà không cần để điện thoại luôn bật
            trực tuyến. <br /> Sử dụng WhatsApp trên tới 4 thiết bị liên kết và
            1 điện thoại cùng lúc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsappHome;
