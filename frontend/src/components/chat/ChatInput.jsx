import React, { useRef, useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/Button";
import { useChat } from "../../context/ChatContext";

export function ChatInput() {
  const [query, setQuery] = useState("");
  const textareaRef = useRef(null);
  const { startBattle, state } = useChat();

  const isGenerating = state.currentInteraction?.isLoading;

  const handleInput = (e) => {
    setQuery(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isGenerating) return;
    
    startBattle(query.trim());
    setQuery("");
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 absolute bottom-6 left-0 right-0 z-10">
      <div className="relative flex w-full items-end gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-xl backdrop-blur focus-within:ring-2 focus-within:ring-zinc-700/50">
        <textarea
          ref={textareaRef}
          rows={1}
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask a coding question to trigger the AI Battle..."
          disabled={isGenerating}
          className="max-h-[200px] w-full resize-none bg-transparent px-3 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none disabled:opacity-50"
        />
        <Button
          onClick={handleSubmit}
          disabled={!query.trim() || isGenerating}
          size="icon"
          className="mb-1 h-10 w-10 shrink-0 rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-300 disabled:bg-zinc-800 disabled:text-zinc-600"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-2 text-center text-xs text-zinc-500">
        AI responses can be inaccurate. Models are judged by Gemini Pro.
      </div>
    </div>
  );
}
