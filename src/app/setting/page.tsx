"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Settings() {
  const [color, setColor] = useState("#3498db"); // Màu mặc định

  // Lấy màu đã lưu (nếu có)
  useEffect(() => {
    const savedColor = localStorage.getItem("color-main");
    if (savedColor) {
      setColor(savedColor);
      document.documentElement.style.setProperty("--color-main", savedColor);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("color-main", color);
    document.documentElement.style.setProperty("--color-main", color);
    toast.success("Cập nhật thành công !!!", {
      position: "top-right",
      autoClose: 3000, // Tự đóng sau 3s
      hideProgressBar: false, // Hiện progress bar
      closeOnClick: true, // Bấm đóng
      pauseOnHover: true, // Dừng khi hover
      draggable: true, // Kéo thả
      progress: undefined,
      theme: "colored", // Hoặc "light", "dark"
    });
  };

  return (
    <div className="h-screen flex items-center px-[20px]">
      <div className="flex flex-col gap-4 max-w-md mx-auto rounded-2xl bg-white px-[20px] py-[20px] w-full">
        <div className="w-full flex justify-center">
          <h1 className="text-2xl font-bold text-[var(--color-main)]">
            Settings
          </h1>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-medium">Choose Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-12 w-12 border rounded"
          />
        </label>

        <button
          onClick={handleSave}
          className="bg-[var(--color-main)] text-white px-4 py-2 h-[50px] rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
}
