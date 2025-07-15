import React from "react";

interface SelectEmojiProps {
  value: string;
  onChange: (value: string) => void;
}

const emojis = ["😊", "😢", "😠"];

const SelectEmoji: React.FC<SelectEmojiProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border px-2 py-1 h-[50px]  dark:border-gray-400"
    >
      <option value="">Chọn cảm xúc...</option>
      {emojis.map((emoji) => (
        <option key={emoji} value={emoji}>
          {emoji}
        </option>
      ))}
    </select>
  );
};

export default SelectEmoji;
