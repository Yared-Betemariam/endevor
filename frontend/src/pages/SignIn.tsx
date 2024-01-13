import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Success!", type: "SUCCESS" });
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
      <h2 className="text-3xl font-jost font-semibold">
        Sign in to your account
      </h2>
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
      <span className=" opacity-80">
        Dont't have Accout?{" "}
        <Link className=" opacity-100 underline" to="/register">
          Create One
        </Link>
      </span>
      <button className="px-8 py-3 mr-auto rounded-full bg-emerald-700 shadow-md hover:opacity-80 active:scale-105 transition-all ease-in-out font-medium">
        Login
      </button>
    </form>
  );
};

export default SignIn;
