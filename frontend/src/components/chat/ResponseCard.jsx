import React from "react";
import { useStreaming } from "../../hooks/useStreaming";
import { Copy, Check, TerminalSquare } from "lucide-react";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Loader } from "../ui/Loader";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/Card";


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ResponseCard({
  title,
  content,
  isLoading,
  isWinner,
  triggerStreaming,
  onStreamingComplete
}) {
  const { displayedText, isComplete } = useStreaming(content, triggerStreaming, 12);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (isComplete && onStreamingComplete) {
      onStreamingComplete();
    }
  }, [isComplete, onStreamingComplete]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPending = isLoading || (!triggerStreaming && !content);
  // The text is already cleaned by the useStreaming hook
  const displaySafeText = displayedText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col h-full min-w-0"
    >
      <Card className={`h-full flex flex-col transition-all duration-500 bg-zinc-900/40 relative overflow-hidden ${isWinner ? 'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-zinc-800'}`}>

        {isWinner && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        )}

        <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-zinc-800/80 bg-zinc-900/60 pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-zinc-300">
            <TerminalSquare className={`w-4 h-4 ${isWinner ? 'text-indigo-400' : 'text-zinc-500'}`} />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {!isPending && isComplete && (
              <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-7 w-7 text-zinc-400 hover:text-zinc-100">
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 overflow-y-auto w-full custom-scrollbar text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {isPending ? (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-500 gap-3">
              <Loader size="md" />
              <span className="text-xs animate-pulse">Generating response...</span>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-td:border prose-th:border prose-table:border-collapse prose-td:border-zinc-700 prose-th:border-zinc-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {displaySafeText + (!isComplete ? ' ▍' : '')}
              </ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
