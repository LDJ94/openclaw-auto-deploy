import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve static frontend in production
const staticPath = join(__dirname, '../dist')
app.use(express.static(staticPath))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Translation API (模拟实现)
app.post('/api/translate', (req, res) => {
  const { audioData, targetLanguage } = req.body
  
  // 模拟翻译结果
  const results = [
    { text: '我饿了', description: '宝宝可能感到饥饿', confidence: 95 },
    { text: '我困了', description: '宝宝想睡觉了', confidence: 88 },
    { text: '我不舒服', description: '宝宝可能身体不适', confidence: 82 },
    { text: '我想抱抱', description: '宝宝需要安抚', confidence: 90 },
    { text: '我无聊了', description: '宝宝想要玩耍', confidence: 85 },
  ]
  
  const result = results[Math.floor(Math.random() * results.length)]
  
  res.json({
    id: Date.now().toString(),
    ...result,
    targetLanguage: targetLanguage || 'zh',
    createdAt: new Date().toISOString()
  })
})

// 语言列表
app.get('/api/languages', (req, res) => {
  res.json([
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ])
})

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(staticPath, 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`Baby Translator running on port ${PORT}`)
})
