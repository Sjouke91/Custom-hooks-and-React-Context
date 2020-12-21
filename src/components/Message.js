import React, { useContext } from "react";
import { CompactMode } from "../lib/CompactMode";

export default function Message({ text, sender, sentAt }) {
  const { isCompact } = useContext(CompactMode);
  return (
    <div>
      <small>
        <strong>{sender}</strong> {sentAt}
      </small>
      <p style={{ marginBottom: isCompact ? 0 : 16 }}>{text}</p>
    </div>
  );
}
