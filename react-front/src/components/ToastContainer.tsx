"use client";

import { useToast } from "@/contexts/ToastContext";
import { useEffect, useState } from "react";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [removingToasts, setRemovingToasts] = useState<string[]>([]);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setRemovingToasts((prev) => [...prev, toast.id]);

        setTimeout(() => {
          removeToast(toast.id);
          setRemovingToasts((prev) => prev.filter((id) => id !== toast.id));
        }, 300);
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 min-w-[200px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded shadow 
          text-white transition-all duration-300
          ${toast.type === "success" ? "bg-green-500" : ""}
          ${toast.type === "error" ? "bg-red-500" : ""}
          ${toast.type === "info" ? "bg-blue-500" : ""}
          ${toast.type === "warning" ? "bg-yellow-500 text-black" : ""}
          ${
            removingToasts.includes(toast.id)
              ? "animate-fade-out"
              : "animate-fade-in"
          }
        `}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => {
              setRemovingToasts((prev) => [...prev, toast.id]);
              setTimeout(() => removeToast(toast.id), 300);
            }}
            className="ml-2 font-bold"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
