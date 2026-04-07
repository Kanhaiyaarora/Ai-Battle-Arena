import express from "express";
import runGraph from "./ai/langGraph.ai.js";
import cors from "cors";
const app = express();
import morgan from "morgan";

app.use(morgan("dev"));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  }),
);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to the AI Comparison API" });
});

app.post("/invoke", async (req, res) => {
  const { problem } = req.body;
  if (typeof problem !== "string") {
    return res
      .status(400)
      .json({ error: "Problem query parameter must be a string" });
  }
  try {
    const result = await runGraph(problem);
    res
      .status(201)
      .json({ message: "Graph invoked successfully", success: true, result });
  } catch (error) {
    console.error("Error invoking graph:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

export default app;
