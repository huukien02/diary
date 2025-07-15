import React from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function fomatMessage(message: string): any {
  if (!message) return [];

  return message.split(/(?<=[.!?])\s+/).map((sentence, index) => (
    <span key={index}>
      ✔️ {sentence}
      <br />
      <br />
    </span>
  ));
}

export default fomatMessage;
