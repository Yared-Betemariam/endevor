import React from "react";
import { useFormContext } from "react-hook-form";
import { PostFormType } from "./ManagePostForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostFormType>();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold font-jost">Add Post</h1>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Name
        <input
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 w-full"
          type="text"
          {...register("name", { required: "Name Required" })}
        />
        {errors?.name && (
          <span className="py-1 text-red-500">{errors.name.message}</span>
        )}
      </label>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Description
        <textarea
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 w-full"
          rows={6}
          {...register("description", { required: "Description Required" })}
        />
        {errors?.description && (
          <span className="py-1 text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Star Rating
        <select
          {...register("starRating", {
            required: "Star Rating Required",
          })}
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 max-w-[50%]"
        >
          <option value="">Select as Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors?.starRating && (
          <span className="py-1 text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
