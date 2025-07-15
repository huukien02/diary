import React from "react";

function fomatMessage(message: string): JSX.Element[] {
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
