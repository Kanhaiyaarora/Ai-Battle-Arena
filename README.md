# ⚔️ AI Battle Arena — Multi-LLM Evaluation Platform

> An AI-powered platform where multiple Large Language Models compete to answer the same prompt, while another AI model acts as an impartial judge to evaluate responses, assign scores, and declare the winner.

---

## 🌐 Live Demo

🔗 https://ai-battle-arena-upfa.onrender.com

---

## 📌 Overview

AI Battle Arena allows users to compare the performance of multiple LLMs on the same prompt.

The platform sends a user's prompt to **Mistral AI** and **Cohere** simultaneously. Both models generate independent responses, after which **Google Gemini** evaluates their outputs based on predefined criteria such as relevance, accuracy, clarity, reasoning, and completeness.

Finally, Gemini assigns scores to both responses and declares the winner.

---

# 🚀 Features

## 🤖 Multi-LLM Battle

- Submit a single prompt
- Generate responses from multiple LLMs
- Side-by-side comparison

Current Competitors:

- 🟠 Mistral AI
- 🔵 Cohere

Judge:

- 🟢 Google Gemini

---

## 🏆 AI Judge

Google Gemini evaluates both responses on:

- Accuracy
- Relevance
- Clarity
- Completeness
- Reasoning Quality

Returns:

- Individual scores
- Strengths
- Weaknesses
- Final Winner

---

## ⚡ LangGraph Workflow

Built using LangGraph to orchestrate the complete AI workflow:

User Prompt

↓

Mistral Response

↓

Cohere Response

↓

Gemini Evaluation

↓

Winner Declaration

---

## 🔐 Input Validation

- Zod schema validation
- Safe request handling
- Structured prompts

---

## 📡 REST API

Scalable Express APIs for:

- Battle generation
- AI orchestration
- Response evaluation

---

## 🏗️ Modular Architecture

Organized project structure with:

- Controllers
- Routes
- AI Services
- Prompt Templates
- Validators
- Middleware

---

# 🛠️ Tech Stack

| Layer | Technology |
|---------|------------|
| Backend | Node.js |
| Framework | Express.js |
| AI Framework | LangChain |
| AI Orchestration | LangGraph |
| LLM | Mistral AI |
| LLM | Cohere |
| AI Judge | Google Gemini |
| Validation | Zod |
| Logging | Morgan |
| Environment | Dotenv |
| Middleware | CORS |

---

# ⚡ Highlights

- 🤖 Multi-LLM orchestration
- 🏆 AI-as-a-Judge architecture
- 🔄 Automated response evaluation
- 📊 Score-based winner selection
- 🧩 Modular backend architecture
- ⚡ Scalable REST APIs

---

# 📂 Project Structure

```
backend
│
├── controllers
├── routes
├── services
│   ├── mistral
│   ├── cohere
│   ├── gemini
│   └── battle
├── validators
├── middleware
├── config
└── server.js
```

---

# 🧠 How It Works

### Step 1

User submits a prompt.

↓

### Step 2

Prompt is sent simultaneously to

- Mistral AI
- Cohere

↓

### Step 3

Both models generate responses.

↓

### Step 4

Gemini receives:

- Original Prompt
- Mistral Response
- Cohere Response

↓

### Step 5

Gemini scores both responses and returns:

- Winner
- Scores
- Detailed reasoning

---

# 🚀 Local Setup

```bash
git clone https://github.com/your-username/ai-battle-arena.git

cd ai-battle-arena

npm install

npm run dev
```

---

# 🔐 Environment Variables

Create a `.env` file.

```env
PORT=3000

GOOGLE_API_KEY=your_google_api_key

MISTRAL_API_KEY=your_mistral_api_key

COHERE_API_KEY=your_cohere_api_key
```

---

# 🎯 API Flow

```
User Prompt
      │
      ▼
 Mistral AI
      │
      ▼
  Cohere AI
      │
      ▼
 Gemini Judge
      │
      ▼
 Score Responses
      │
      ▼
 Declare Winner
```

---

# 🚀 Future Improvements

- Support 10+ LLMs
- Tournament Mode
- Elo Rating System
- Prompt History
- User Authentication
- Leaderboards
- Cost Tracking
- Streaming Responses
- Response Analytics Dashboard
- Export Battle Results
- Prompt Templates
- Multi-round Debates
- Human + AI Hybrid Judging

---

# 💡 Use Cases

- LLM Benchmarking
- Prompt Engineering
- AI Research
- Model Comparison
- AI Evaluation
- Educational Demonstrations

---

# 👨‍💻 Author

**Kanhaiya Arora**

GitHub: https://github.com/Kanhaiyaarora

---

## ⭐ If you like this project, consider giving it a star!


<img width="1920" height="1020" alt="Vite + React - Google Chrome 23-07-2026 16_39_16" src="https://github.com/user-attachments/assets/7a5c3d82-050f-4bd7-b53d-5fbf5d753ae7" />
<img width="1920" height="1020" alt="Vite + React - Google Chrome 23-07-2026 16_38_48" src="https://github.com/user-attachments/assets/5e826669-a1e9-49be-a866-13b9cd2c5817" />
