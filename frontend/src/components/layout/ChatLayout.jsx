import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function ChatLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30">
      {/* Sidebar for History / Settings */}
      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 relative overflow-hidden">
        <Header />
        
        {/* Main Content Area where messages/battles show */}
        <div className="flex-1 w-full relative flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
