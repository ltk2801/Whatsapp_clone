import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Vui lòng nhập họ tên")
    .matches(/^[\p{L}\s]*$/u, "Họ và tên chỉ được phép chứa chữ")
    .min(5, "Họ tên phải nhiều hơn 5 ký tự")
    .max(45, "Họ tên phải ít hơn 45 ký tự"),
  email: Yup.string()
    .required("Vui lòng nhập địa chỉ email")
    .email("Địa chỉ email không chính xác"),
  status: Yup.string().max(64, "Trạng thái phải ít hơn 64 ký tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Mật khẩu phải chứa ít nhất 6 ký tự, gồm 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặc biệt"
    )
    .max(128, "Mật khẩu phải ít hơn 128 ký tự"),
});
