import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  name,
  placeholder,
  register,
  error,
  label,
  onChange,
  bind,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold -tracking-wide">
        {label} {bind && <span className="text-red-700 ml-1 "> *</span>}
      </label>
      <div className="relative">
        <input
          className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
          type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...register}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
