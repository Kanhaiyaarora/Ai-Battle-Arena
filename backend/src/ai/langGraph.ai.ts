import {
  StateSchema,
  type GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import { geminiModel, mistralAIModel, cohereModel } from "./model.ai.js";
import z from "zod";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
    winner: z.enum(["solution_1", "solution_2", "tie"]).default("tie"),
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  const [mistralAISolution, cohereSolution] = await Promise.all([
    mistralAIModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);
  return {
    problem: state.problem,
    solution_1: typeof mistralAISolution.content === 'string' ? mistralAISolution.content : JSON.stringify(mistralAISolution.content),
    solution_2: typeof cohereSolution.content === 'string' ? cohereSolution.content : JSON.stringify(cohereSolution.content),
    judge: {
      solution_1_score: 0,
      solution_2_score: 0,
      solution_1_reasoning: "",
      solution_2_reasoning: "",
      winner: "tie",
    },
  };
};

const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state;

  const judge = createAgent({
    model: geminiModel,
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().max(10).min(0),
        solution_2_score: z.number().max(10).min(0),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
        winner: z.enum(["solution_1", "solution_2", "tie"]),
      }),
    ),

    systemPrompt: `You are a judge tasked with evaluating two solutions to the following problem: ${problem}.

    Solution 1: ${solution_1},
    Solution 2: ${solution_2}.

    Evaluate each solution based on its correctness, creativity, and clarity. Assign a score from 0 to 10 for each solution, provide reasoning for the scores, and determine the winner (solution_1, solution_2, or tie).`,
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(`Problem: ${problem},
      Solution 1: ${solution_1},
      Solution 2: ${solution_2},
      Please evaluate the solutions and provide scores,reasoning and winner.
      `),
    ],
  });

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
    winner,
  } = judgeResponse.structuredResponse;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
      winner,
    },
  };
};

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export default async function (problem: string) {
  const result = await graph.invoke({
    problem,
  });
  return result;
}
