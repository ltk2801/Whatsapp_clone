import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng cung cấp họ tên của bạn"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng cung cấp địa chỉ email của bạn"],
      unique: [true, "Địa chỉ email này đã được sử dụng "],
      lowercase: true,
      validate: [
        validator.isEmail,
        "Vui lòng cung cấp địa chỉ email chính xác",
      ],
    },
    picture: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    },
    status: {
      type: String,
      default: "Chào mọi người ! Tôi đang sử dụng ứng dụng whatsapp",
    },
    password: {
      type: String,
      required: [true, "Vui lòng cung cấp password"],
      minLength: [6, "Password phải nhiều hơn 6 ký tự"],
      maxLength: [128, "Password phải ít hơn hơn 128 ký tự"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcryptjs.genSalt(12);
      const hashedPassword = await bcryptjs.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userSchema);

export default UserModel;
