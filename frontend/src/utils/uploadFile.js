import axios from "axios";
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

export const uploadFiles = async (files) => {
  // upload file ảnh lên cloud, trả về 1 response
  let formData = new FormData();
  formData.append("upload_preset", cloud_secret);
  let uploaded = [];
  const uploadPromise = files.map(async (f) => {
    const { file, type } = f;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData);
    uploaded.push({
      file: res,
      type,
    });
  });
  await Promise.all(uploadPromise);
  return uploaded;
};

const uploadToCloudinary = async (formData) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
