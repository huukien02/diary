import React from "react";

export default function fomatMessage(message: string): React.JSX.Element[] {
  if (!message) return [];

  return message.split(/(?<=[.!?])\s+/).map((sentence, index) => (
    <span key={index}>
      ✔️ {sentence}
      <br />
      <br />
    </span>
  ));
}
