"use client";
import SelectEmoji from "@/components/SelectEmoji";
import { database } from "@/firebaseConfig";
import {
  endAt,
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
  startAt,
} from "firebase/database";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Write() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreviewUrl("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

    const postsRef = ref(database, "posts");
    const snapshot = await get(postsRef);

    let hasPostToday = false;

    if (snapshot.exists()) {
      snapshot.forEach((child) => {
        const createdAt = child.val().createdAt;
        if (createdAt >= startOfDay && createdAt <= endOfDay) {
          hasPostToday = true;
        }
      });
    }
    if (hasPostToday) {
      toast.error("Bạn đã viết nhật kí hôm nay rồi !!", {
        position: "top-right",
        autoClose: 3000, // Tự đóng sau 3s
        hideProgressBar: false, // Hiện progress bar
        closeOnClick: true, // Bấm đóng
        pauseOnHover: true, // Dừng khi hover
        draggable: true, // Kéo thả
        progress: undefined,
        theme: "colored", // Hoặc "light", "dark"
      });
      setLoading(false);
      return;
    }

    if (!message.trim() || !file) {
      toast.error("Vui lòng nhập đầy đủ nhật kí", {
        position: "top-right",
        autoClose: 3000, // Tự đóng sau 3s
        hideProgressBar: false, // Hiện progress bar
        closeOnClick: true, // Bấm đóng
        pauseOnHover: true, // Dừng khi hover
        draggable: true, // Kéo thả
        progress: undefined,
        theme: "colored", // Hoặc "light", "dark"
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhmr88vva/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const uploadedUrl = data.secure_url;

      // Save to Firebase Realtime Database
      const postsRef = ref(database, "posts");
      await push(postsRef, {
        message,
        imageUrl: uploadedUrl,
        createdAt: Date.now(),
        emoji: selectedEmoji,
      });

      toast.success("Tạo nhật kí thành công !!!", {
        position: "top-right",
        autoClose: 3000, // Tự đóng sau 3s
        hideProgressBar: false, // Hiện progress bar
        closeOnClick: true, // Bấm đóng
        pauseOnHover: true, // Dừng khi hover
        draggable: true, // Kéo thả
        progress: undefined,
        theme: "colored", // Hoặc "light", "dark"
      });

      setMessage("");
      setFile(null);
      setPreviewUrl("");
      setSelectedEmoji("");
      router.push("/");
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen flex items-center px-[20px]">
      <div className="flex flex-col gap-4 max-w-md mx-auto rounded-2xl bg-[white] px-[20px] py-[20px] w-full">
        <div className="w-full flex justify-center">
          <h1 className="text-2xl font-bold text-[var(--color-main)]">
            Write Diary
          </h1>
        </div>
        <SelectEmoji value={selectedEmoji} onChange={setSelectedEmoji} />
        <div className="flex items-center">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="flex items-center cursor-pointer bg-[var(--color-main)] text-white px-4 py-2 rounded-md"
          >
            <FaUpload className="text-xl" />
            <span className="ml-2 text-sm">Upload Image</span>
          </label>
        </div>
        {previewUrl && (
          <div className="relative inline-block w-full">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-[200px] rounded-md"
            />
            <button
              onClick={() => setPreviewUrl("")}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
            >
              <IoClose size={20} />
            </button>
          </div>
        )}
        <textarea
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 min-h-[200px] dark:border-gray-400 rounded-md"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[var(--color-main)] text-white px-4 py-2 h-[50px] rounded-md"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default Write;
