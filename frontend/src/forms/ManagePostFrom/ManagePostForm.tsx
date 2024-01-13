import React from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import ImagesSection from "./ImagesSection";

export type PostFormType = {
  name: string;
  description: string;
  type: string;
  starRating: number;
  imageUrls: FileList;
};

type ManagePostType = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManagePostForm: React.FC<ManagePostType> = ({ onSave, isLoading }) => {
  const formHook = useForm<PostFormType>();

  const onSubmit: SubmitHandler<PostFormType> = (formDataJson) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("starRating", formDataJson.starRating.toString());

    Array.from(formDataJson.imageUrls).forEach((image) => {
      formData.append("imageFiles", image);
    });

    onSave(formData);
  };

  return (
    <FormProvider {...formHook}>
      <form
        className="flex flex-col w-full md:w-2/3 lg:1/2 py-4 gap-5"
        onSubmit={formHook.handleSubmit(onSubmit)}
      >
        <DetailsSection />
        <TypeSection />
        <ImagesSection />
        <button
          type="submit"
          className="px-6 py-3 mr-auto rounded-full bg-emerald-700 shadow-md hover:opacity-80 active:scale-105 transition-all ease-in-out font-medium disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </FormProvider>
  );
};

export default ManagePostForm;
