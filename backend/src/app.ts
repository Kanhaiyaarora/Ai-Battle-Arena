import express from 'express'
import runGraph from './ai/langGraph.ai.js'
const app = express()


app.get('/', async (req,res)=>{
const result = await runGraph("how to become rich like top 1% people in the world")
    res.json(result)
})

export default app 