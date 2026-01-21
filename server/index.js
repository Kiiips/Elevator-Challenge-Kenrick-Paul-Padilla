import express from 'express'
import path from 'path'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  if (req.method === 'POST' || req.method === 'PUT') console.log('  body:', req.body)
  next()
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

const requests = []
const riders = []

app.get('/requests', (req, res) => res.json(requests))
app.post('/requests', (req, res) => {
  const r = req.body
  requests.push(r)
  console.log('  requests now:', JSON.stringify(requests))
  res.status(201).json(r)
})
app.delete('/requests/:index', (req, res) => {
  const idx = parseInt(req.params.index)
  if (idx < 0 || idx >= requests.length) return res.sendStatus(404)
  requests.splice(idx, 1)
  console.log('  requests now:', JSON.stringify(requests))
  res.sendStatus(204)
})
app.delete('/requests', (req, res) => {
  requests.length = 0
  console.log('  requests cleared')
  res.sendStatus(204)
})

app.get('/riders', (req,res) => res.json(riders))
app.post('/riders', (req,res) => { riders.push(req.body); res.status(201).json(req.body) })
app.delete('/riders/:name', (req,res) => {
  const idx = riders.findIndex(r => r.name === req.params.name)
  if (idx === -1) return res.sendStatus(404)
  riders.splice(idx,1)
  res.sendStatus(204)
})

app.get('/debug', (req,res) => {
  res.json({ requests, riders })
})

const webPath = path.join(process.cwd(), '..', 'web')
app.use(express.static(webPath))

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`UI and Server listening on port ${port}`)
  console.log(`Check via: http://localhost:${port}/index.html`)
})
