import React from "react";
import { useFormContext } from "react-hook-form";
import { PostFormType } from "./ManagePostForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostFormType>();

  return (
    <div className="py-2">
      <h1 className="text-2xl pb-2 font-jost font-medium">Images</h1>
      <div className="flex gap-2 border-2 px-6 py-3 rounded-full border-opacity-50 border-white">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full"
          {...register("imageUrls", {
            validate: (imageFiles) => {
              const totLen = imageFiles.length;
              if (totLen == 0) {
                return "At least 1 is required";
              }
              if (totLen > 6) {
                return "Total Number of images can't be more than 6";
              }
            },
          })}
        />
        {errors?.imageUrls && (
          <span className="py-1 text-red-500">{errors.imageUrls.message}</span>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
