import axios from "axios";

// Add this declaration to extend ImportMeta with env property

export const uploadFile = async (urlImage: File[]) => {

    const data = new FormData();
    data.append("file", urlImage[0]);
    data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    return await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        data
    );
}