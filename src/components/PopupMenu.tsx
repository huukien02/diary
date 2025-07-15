"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaEdit, FaCog, FaBars } from "react-icons/fa";

export default function PopupMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: "index", label: "Trang chính", icon: <FaHome />, href: "/" },
    { id: "write", label: "Viết bài", icon: <FaEdit />, href: "/write" },
    { id: "setting", label: "Cài đặt", icon: <FaCog />, href: "/setting" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-30 p-3 bg-[var(--color-main)] text-white rounded-full hover:opacity-80"
        title="Menu"
      >
        <FaBars size={20} />
      </button>

      {isOpen && (
        <div className="fixed top-16 right-4 z-20 w-48 bg-white border border-gray-300 rounded shadow">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.href);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
            >
              <span className="text-[var(--color-main)]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
