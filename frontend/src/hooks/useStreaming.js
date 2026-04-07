import { useState, useEffect } from "react";

/**
 * A custom hook to simulate a streaming typing effect for large block of text.
 * @param {string} fullText - The target string to write out.
 * @param {boolean} triggerStreaming - Whether to start the streaming effect.
 * @param {number} speed - The delay between chars in ms.
 * @returns {object} { displayedText, isComplete }
 */
export const useStreaming = (fullText, triggerStreaming, speed = 15) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!triggerStreaming || !fullText) {
      if (!fullText) setDisplayedText("");
      return;
    }

    // Pre-calculate the cleaned text to avoid regex/replacement artifacts during streaming
    const cleanText = fullText.replace(/^"|"$/g, "").trim();
    
    let currentIndex = 0;
    setIsComplete(false);
    setDisplayedText("");

    const streamInterval = setInterval(() => {
      // Stream in chunks of 5 characters for better speed and smoother feel
      const chunkSize = 5;
      const nextChunk = cleanText.slice(currentIndex, currentIndex + chunkSize);
      
      setDisplayedText((prev) => prev + nextChunk);
      currentIndex += chunkSize;

      if (currentIndex >= cleanText.length) {
        clearInterval(streamInterval);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(streamInterval);
  }, [fullText, triggerStreaming, speed]);

  return { displayedText, isComplete };
};
