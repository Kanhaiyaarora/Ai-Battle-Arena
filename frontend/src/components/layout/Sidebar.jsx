import React from "react";
import { useChat } from "../../context/ChatContext";
import { CopyPlus, Swords, History, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Tooltip } from "../ui/Tooltip";

export function Sidebar() {
  const { state, dispatch } = useChat();
  const { history } = state;

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 hidden md:flex flex-col flex-shrink-0 relative transition-transform duration-300">
      <div className="p-4 flex items-center mb-2 justify-between border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
           <Swords className="w-6 h-6 text-indigo-400" />
           <h1 className="font-semibold text-zinc-100 tracking-tight">AI Arena</h1>
        </div>
      </div>
      
      <div className="px-3 pb-3">
        <Button 
           variant="outline" 
           className="w-full justify-start text-zinc-300 gap-2 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800"
           onClick={() => {
              // Force clear current to start fresh
              if(state.currentInteraction) {
                 dispatch({ type: "SAVE_CURRENT_TO_HISTORY" })
              }
           }}
        >
          <CopyPlus className="w-4 h-4" />
          <span className="text-sm font-medium">New Battle</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <div className="flex items-center gap-2 px-2 py-2 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          <History className="w-3.5 h-3.5" />
          <span>Battle History</span>
        </div>
        
        {history.length === 0 ? (
          <div className="px-2 py-4 text-sm text-zinc-500 italic text-center">
             No battles yet
          </div>
        ) : (
          <div className="space-y-1">
            {history.map((interaction, i) => (
              <button 
                key={i} 
                className="w-full text-left px-3 py-2 text-sm text-zinc-300 rounded-md hover:bg-zinc-800 transition-colors truncate"
              >
                {interaction.query}
              </button>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
         <div className="p-3 border-t border-zinc-800 mt-auto">
            <Tooltip text="Clear History" position="top">
              <Button 
                 variant="ghost" 
                 size="icon" 
                 className="w-full text-zinc-400 hover:text-red-400 hover:bg-red-950/30"
                 onClick={() => dispatch({type: "CLEAR_HISTORY"})}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Tooltip>
         </div>
      )}
    </aside>
  );
}
