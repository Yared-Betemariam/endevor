import React from "react";
import { useFormContext } from "react-hook-form";
import { postTypes } from "../../config/post-types-config";
import { PostFormType } from "./ManagePostForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<PostFormType>();

  const typeWatch = watch("type");

  return (
    <div className="py-2">
      <h1 className="text-2xl pb-2 font-jost font-medium">Type</h1>
      <div className="grid grid-cols-2 gap-2">
        {postTypes.map((type) => (
          <label
            className={`rounded-full px-6 py-3 flex justify-between cursor-pointer font-medium items-center ${
              typeWatch == type ? "bg-red-800" : "bg-gray-800"
            }`}
          >
            {type}
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type", {
                required: "Type Required",
              })}
            />
          </label>
        ))}
        {errors?.type && (
          <span className="py-1 text-red-500">{errors.type.message}</span>
        )}
      </div>
    </div>
  );
};

export default TypeSection;
