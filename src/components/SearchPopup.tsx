"use client";
import { useState } from "react";

interface SearchPopupProps {
  onClose: () => void;
  onSearch: (date: string, emoji: string) => void;
}

const emojis = ["😊", "😢", "😠"];

export default function SearchPopup({ onClose, onSearch }: SearchPopupProps) {
  const [filterDate, setFilterDate] = useState("");
  const [filterEmoji, setFilterEmoji] = useState("");

  const handleSearch = () => {
    onSearch(filterDate, filterEmoji);
  };

  const clearFilters = () => {
    setFilterDate("");
    setFilterEmoji("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[350px] shadow-2xl relative">
        <h2 className="text-xl font-semibold text-[var(--color-main)] mb-5 text-center">
          🔍 Tìm kiếm nhật ký
        </h2>

        {/* Chọn ngày */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày:
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]"
          />
        </div>

        {/* Chọn emoji */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cảm xúc:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`text-2xl border rounded-md border-gray-300 px-2 py-1 ${
                  filterEmoji === emoji
                    ? "bg-[var(--color-main)] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setFilterEmoji((prev) => (prev === emoji ? "" : emoji))
                }
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex flex-col w-full items-center mt-6 gap-[10px]">
          <button
            onClick={handleSearch}
            className="bg-[var(--color-main)] text-white px-4 py-2 rounded-md w-full mr-2"
          >
            Tìm kiếm
          </button>
          <button
            onClick={clearFilters}
            className="bg-[var(--color-main)] opacity-50 text-white px-4 py-2 rounded-md w-full mr-2"
          >
            Xoá lọc
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-400 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
