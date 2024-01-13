import React from "react";
import { useMutation } from "react-query";
import ManagePostForm from "../forms/ManagePostFrom/ManagePostForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
const AddPost = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addPost, {
    onSuccess: () => {
      showToast({ message: "Post Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "An Error Occured", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    console.log(hotelFormData);
    mutate(hotelFormData);
  };
  return <ManagePostForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddPost;
