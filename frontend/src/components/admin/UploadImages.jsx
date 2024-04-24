import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();

  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      setImagesPreview([]);
      toast.success("圖片已成功上傳！");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess, deleteError, navigate]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image);

    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };

  return (
    <AdminLayout>
      <MetaData title={"更新商品圖"} />
      <div className="container mx-auto mt-5">
        <form
          className="shadow rounded bg-white px-8 pt-6 pb-8 mb-4"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
            更新商品圖
          </h2>

          <div className="relative mb-4">
            <label
              htmlFor="customFile"
              className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            >
              選擇圖片
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="product_images"
              className="file-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="customFile"
              multiple
              onChange={onChange}
              onClick={handleResetFileInput}
            />
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">選擇圖片</span>
                {/* <i className="fa-regular fa-image"></i> */}
              </button>
            </span>
            {imagesPreview?.length > 0 && (
              <div className="mt-4">
                <span className="flex items-center">
                  <span className="pr-6 text-warning">新增圖片</span>
                  <span className="h-px flex-1 bg-black"></span>
                </span>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-2">
                  {imagesPreview?.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-[350px] sm:h-[450px]"
                    >
                      <img
                        src={img}
                        alt="Preview"
                        className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 rounded-md "
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 h-8 w-8 bg-red-500 hover:bg-red-600 rounded-full text-white flex justify-center items-center hover:shadow-lg transition-shadow duration-300"
                        onClick={() => handleImagePreviewDelete(img)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedImages?.length > 0 && (
              <div className="mt-4">
                <span className="flex items-center">
                  <span className="pr-6 text-success">更新後</span>
                  <span className="h-px flex-1 bg-black"></span>
                </span>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-2">
                  {uploadedImages?.map((img) => (
                    <div
                      key={img?.public_id}
                      className="relative h-[350px] sm:h-[450px]"
                    >
                      <img
                        src={img?.url}
                        alt="Uploaded"
                        className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 h-8 w-8 bg-red-500 hover:bg-red-600 rounded-full text-white flex justify-center items-center hover:shadow-lg transition-shadow duration-300"
                        disabled={isLoading || isDeleteLoading}
                        onClick={() => deleteImage(img?.public_id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="group relative inline-block focus:outline-none focus:ring"
            disabled={isLoading || isDeleteLoading}
          >
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
              {isLoading ? "Uploading..." : "Upload"}
            </span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
