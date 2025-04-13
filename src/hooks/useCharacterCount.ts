"use client";

import { useState } from "react";

export function useCharacterCount() {
  const [characterCount, setCharacterCount] = useState<number>(0);

  // This function updates the character count based on the input value
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setCharacterCount(event.target.value.length);
  };

  // This function resets the character count to 0
  const resetCount = (): void => {
    setCharacterCount(0);
  };
  return {
    characterCount,
    handleInputChange,
    resetCount,
  };
}
