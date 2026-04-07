import React, { useState, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { ResponseCard } from "./ResponseCard";
import { JudgePanel } from "./JudgePanel";
import { Sparkles } from "lucide-react";

export function BattleView({ interaction }) {
  const [modelAComplete, setModelAComplete] = useState(false);
  const [modelBComplete, setModelBComplete] = useState(false);

  const isPending = interaction?.isLoading;

  useEffect(() => {
    if (isPending) {
      setModelAComplete(false);
      setModelBComplete(false);
    }
  }, [isPending]);

  if (!interaction) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4 opacity-50">
        <Sparkles className="w-12 h-12 text-zinc-700" />
        <p>Start a battle to see results here.</p>
      </div>
    );
  }

  const { query, modelA, modelB, judge, error } = interaction;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-2 sm:px-0 scroll-smooth">
      {/* 1. Human Query */}
      <MessageBubble message={query} />

      {/* 2. Error State */}
      {error && (
        <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 rounded-xl mb-8">
          <h3 className="font-semibold text-red-300 mb-1">Battle Failed</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* 3. Models Responses Side-by-Side */}
      {(!error && (isPending || modelA || modelB)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 min-h-[400px]">
          <ResponseCard
            title="Model A (Mistral)"
            content={modelA}
            isLoading={isPending}
            isWinner={judge?.winner === "solution_1" || judge?.winner === "Model A"}
            triggerStreaming={!isPending && !!modelA}
            onStreamingComplete={() => setModelAComplete(true)}
          />
          <ResponseCard
            title="Model B (Cohere)"
            content={modelB}
            isLoading={isPending}
            isWinner={judge?.winner === "solution_2" || judge?.winner === "Model B"}
            triggerStreaming={!isPending && !!modelB}
            onStreamingComplete={() => setModelBComplete(true)}
          />
        </div>
      )}

      {/* 4. Judge Panel - Reveals after both model streams complete */}
      {judge && modelAComplete && modelBComplete && !isPending && (
        <JudgePanel judgeData={judge} triggerStreaming={true} />
      )}
    </div>
  );
}
