import React, { createContext, useState } from "react";

export const CompactMode = createContext();

export function AddCompactModeFeature(props) {
  const [isCompact, setIsCompact] = useState(false);

  const toggleCompactMode = () => setIsCompact(!isCompact);
  console.log(isCompact);

  return (
    <CompactMode.Provider value={{ isCompact, toggleCompactMode }}>
      {props.children}
    </CompactMode.Provider>
  );
}
