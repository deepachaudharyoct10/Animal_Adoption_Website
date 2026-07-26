import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(dataUrl: string, folder: string) {
  const result = await cloudinary.uploader.upload(dataUrl, {
    folder,
  });
  return result.secure_url;
}

export default cloudinary;
