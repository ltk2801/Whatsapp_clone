import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const onSubmit = async (data) => {
    let res = await dispatch(loginUser({ ...data }));
    if (res?.payload?.user) {
      toast.success(`Chào mừng trở lại, ${res.payload.user.name}`);
      navigate("/");
    }
  };

  return (
    <div className="mn-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className=" w-full max-w-md  space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Đăng Nhập</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            label="Email"
            name="email"
            register={register("email")}
            placeholder="Email"
            type="email"
            error={errors?.email}
          />
          <PasswordInput
            label="Mật Khẩu"
            name="password"
            register={register("password")}
            placeholder="Mật khẩu"
            error={errors?.password}
          />
          {/* if we have an error */}
          {error && (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          )}
          {/* Submit button */}
          <button
            disabled={status === "loading"}
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <ClipLoader color="#fff" size={16} />
            ) : (
              "Đăng Nhập"
            )}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Bạn chưa có tài khoản?</span>
            <Link
              className=" hover:underline cursor-pointer transition ease-in duration-300 text-green_2"
              to="/register"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
