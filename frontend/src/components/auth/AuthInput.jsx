import React from "react";

const AuthInput = ({
  name,
  type,
  placeholder,
  register,
  error,
  label,
  onChange,
  bind,
}) => {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold -tracking-wide">
        {label} {bind && <span className="text-red-700 ml-1 "> *</span>}
      </label>
      <input
        className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...register}
      />
      {error && <p className="text-red-400">{error.message}</p>}
    </div>
  );
};

export default AuthInput;
