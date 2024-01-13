import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className="flex flex-col w-full md:w-2/3 lg:1/2 py-4 gap-5"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-jost font-semibold">Create an Account</h2>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Username
        <input
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 w-full"
          placeholder="john_spencer"
          type="text"
          {...register("username", { required: "Username Required" })}
        />
        {errors?.username && (
          <span className="py-1 text-red-500">{errors.username.message}</span>
        )}
      </label>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Email
        <input
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 w-full"
          placeholder="spencerjhon@endevor.com"
          type="email"
          {...register("email", { required: "Email Required" })}
        />
        {errors?.email && (
          <span className="py-1 text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Password
        <input
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 w-full"
          placeholder="Your password"
          type="password"
          {...register("password", {
            required: "Password Missing",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors?.password && (
          <span className="py-1 text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex flex-col font-medium gap-1 text-lg">
        Confirm Password
        <input
          className="bg-gray-800 rounded-md bg-opacity-90 text-base px-4 py-3 w-full"
          placeholder="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Field Required";
              } else if (watch("password") !== val) {
                return "Passwords don't match";
              }
            },
          })}
        />
        {errors?.confirmPassword && (
          <span className="py-1 text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <button className="px-8 py-3 mr-auto rounded-full bg-emerald-700 shadow-md hover:opacity-80 active:scale-105 transition-all ease-in-out font-medium">
        Create Account
      </button>
    </form>
  );
};

export default Register;
