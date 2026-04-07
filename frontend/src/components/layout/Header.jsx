import React from "react";
import { Sparkles, FolderGit, Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { Tooltip } from "../ui/Tooltip";

export function Header() {
  return (
    <header className="h-14 flex flex-shrink-0 items-center justify-between px-4 border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5 text-zinc-400" />
        </Button>
        <div className="flex items-center gap-1.5 md:hidden">
          <h1 className="font-semibold text-zinc-200">AI Arena</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Model selector dropdown visual placement */}
        <div className="px-3 py-1.5 text-xs font-medium rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 flex items-center gap-1.5 hidden sm:flex">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Mistral vs Cohere
        </div>

        <Tooltip text="View Repo" position="bottom">
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <FolderGit className="w-5 h-5" />
          </Button>
        </Tooltip>

        <Button variant="premium" size="sm" className="hidden sm:flex gap-1.5 h-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Upgrade</span>
        </Button>
      </div>
    </header>
  );
}
