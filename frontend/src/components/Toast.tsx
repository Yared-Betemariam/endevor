import React from "react";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed bottom-6 right-6 z-50 p-4 px-8 rounded-md bg-green-600 bg-opacity-95 max-w-md"
      : "fixed bottom-6 right-6 z-50 p-4 px-8 rounded-md bg-red-600 bg-opacity-95 max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center text-white">
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
