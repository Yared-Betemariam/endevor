import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }
};
export const signIn = async (formData: SignInFormData) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.message);
  }
  return resBody;
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE}/api/auth/validate-token`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Token Valid");
  }

  return res.json();
};
export const signOut = async () => {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("An Error Occured");
  }
};

export const addPost = async (formData: FormData) => {
  const res = await fetch(`${API_BASE}/api/my-posts`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Failed to add hotel");
  }
  return res.json();
};
