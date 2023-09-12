import React from "react";

const UnderlineInput = ({ name, setName }) => {
  return (
    <div className="mt-4 mb-2">
      <input
        type="text"
        placeholder="Tên cuộc trò chuyện"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-transparent border-b border-green_1 dark:text-dark_text_1 outline-none pl-1"
      />
    </div>
  );
};

export default UnderlineInput;
