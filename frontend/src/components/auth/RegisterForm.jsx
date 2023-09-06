import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice";
import Picture from "./Picture";
import axios from "axios";
import toast from "react-hot-toast";

const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = async (data) => {
    let res;
    dispatch(changeStatus("loading"));
    if (picture) {
      // upload to cloudinary & then register user
      await uploadImage().then(async (dataImage) => {
        res = await dispatch(
          registerUser({ ...data, picture: dataImage.secure_url })
        );
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }
    if (res?.payload?.user) {
      toast.success(`Đăng ký thành công! Chào mừng bạn đến với Whatsapp.`);
      navigate("/");
    }
  };
  const uploadImage = async () => {
    // upload file ảnh lên cloud, trả về 1 response
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data;
  };

  return (
    <div className="mn-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className=" w-full max-w-md  space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Đăng Ký</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            label="Họ Và Tên"
            name="name"
            register={register("name")}
            placeholder="Họ và tên"
            type="text"
            error={errors?.name}
            bind={true}
          />
          <AuthInput
            label="Email"
            name="email"
            register={register("email")}
            placeholder="Email"
            type="email"
            error={errors?.email}
            bind={true}
          />
          <AuthInput
            label="Trạng Thái (Không bắt buộc)"
            name="status"
            register={register("status")}
            placeholder="Trạng thái"
            type="text"
            error={errors?.status}
          />
          <PasswordInput
            label="Mật Khẩu"
            name="password"
            register={register("password")}
            placeholder="Mật khẩu"
            error={errors?.password}
            bind={true}
          />
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
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
              "Đăng Ký"
            )}
          </button>
          {/* Sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Bạn đã có tài khoản?</span>
            <Link
              className=" hover:underline cursor-pointer transition ease-in duration-300 text-green_2"
              to="/login"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
