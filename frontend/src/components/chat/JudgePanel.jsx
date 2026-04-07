import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useStreaming } from '../../hooks/useStreaming';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Scale, Trophy, AlertCircle } from 'lucide-react';

export function JudgePanel({ judgeData, triggerStreaming }) {
  if (!judgeData) return null;

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
    winner
  } = judgeData;

  const { displayedText: r1, isComplete: r1Complete } = useStreaming(solution_1_reasoning, triggerStreaming, 15);
  const { displayedText: r2, isComplete: r2Complete } = useStreaming(solution_2_reasoning, triggerStreaming && r1Complete, 15);

  const determineWinnerDisplay = () => {
    if (winner === "solution_1" || winner === "Model A") return "Model A Wins!";
    if (winner === "solution_2" || winner === "Model B") return "Model B Wins!";
    return "It's a Tie!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-8 mb-32 mx-auto w-full"
    >
      <Card className="border-indigo-500/30 bg-zinc-950/80 shadow-[0_0_30px_rgba(99,102,241,0.05)] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        
        <div className="p-5 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-zinc-100">Gemini Pro Judge Evaluation</h3>
          </div>
          {r1Complete && r2Complete && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center gap-2"
            >
               <Trophy className="w-4 h-4 text-indigo-400" />
               <span className="text-sm font-bold text-indigo-300">{determineWinnerDisplay()}</span>
            </motion.div>
          )}
        </div>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model A Reasoning */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">Model A Score</span>
                <span className="text-lg font-bold text-zinc-200">{solution_1_score}/10</span>
             </div>
             <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(solution_1_score / 10) * 100}%` }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="h-full bg-indigo-500 rounded-full"
                />
             </div>
             <div className="text-sm text-zinc-300 leading-relaxed min-h-[60px] bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/80 prose prose-invert prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {r1 + (!r1Complete ? ' ▍' : '')}
                </ReactMarkdown>
             </div>
          </div>

          {/* Model B Reasoning */}
          <div className="space-y-3">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">Model B Score</span>
                <span className="text-lg font-bold text-zinc-200">{solution_2_score}/10</span>
             </div>
             <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(solution_2_score / 10) * 100}%` }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="h-full bg-purple-500 rounded-full"
                />
             </div>
             <div className="text-sm text-zinc-300 leading-relaxed min-h-[60px] bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/80 prose prose-invert prose-sm max-w-none">
                {r2Complete || r1Complete ? (
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {r2 + (r1Complete && !r2Complete ? ' ▍' : '')}
                   </ReactMarkdown>
                ) : (
                   <span className="text-zinc-600 flex items-center gap-2 pt-2"><AlertCircle className="w-3.5 h-3.5"/> Waiting for analysis...</span>
                )}
             </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
