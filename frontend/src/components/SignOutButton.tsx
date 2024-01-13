import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ message: "Log out Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  return (
    <button
      className="rounded-full px-7 py-3 border-red-700 border-[2.5px] font-semibold text-red-700 shadow-md hover:opacity-90 transition-all ease-in-out active:scale-105 bg-opacity-60 bg-gray-800"
      onClick={() => mutation.mutate()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
