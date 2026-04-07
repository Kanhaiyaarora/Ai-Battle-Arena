import React from "react";
import { User } from "lucide-react";

export function MessageBubble({ message }) {
  if (!message) return null;

  return (
    <div className="flex w-full mb-8">
      <div className="ml-auto w-full max-w-3xl mx-auto flex gap-4 px-4 sm:px-0">
        <div className="flex-1 space-y-2 overflow-hidden px-1">
          <div className="flex items-center gap-2">
             <div className="bg-zinc-800 p-1 rounded-full"><User className="w-4 h-4 text-zinc-300" /></div>
             <p className="font-semibold text-sm text-zinc-200">You</p>
          </div>
          <div className="prose prose-invert max-w-none text-zinc-100 bg-zinc-900/50 p-4 rounded-2xl rounded-tr-sm border border-zinc-800 break-words leading-relaxed">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}
