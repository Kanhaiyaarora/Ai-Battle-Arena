import React from 'react';
import { ChatProvider, useChat } from '../context/ChatContext.jsx';
import { ChatLayout } from '../components/layout/ChatLayout.jsx';
import { ChatInput } from '../components/chat/ChatInput.jsx';
import { BattleView } from '../components/chat/BattleView.jsx';

function ChatInterface() {
  const { state } = useChat();

  return (
    <ChatLayout>
      <div className="flex-1 overflow-y-auto w-full pb-32 pt-8">
         <BattleView interaction={state.currentInteraction} />
      </div>
      <ChatInput />
    </ChatLayout>
  );
}

function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}

export default App;