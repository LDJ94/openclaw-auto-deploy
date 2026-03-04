require('dotenv').config();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();

// Translate text (mock implementation - actual AI translation would go here)
router.post('/translate', authMiddleware, async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage, audioData } = req.body;

    if (!text || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ error: 'Text, source language, and target language are required' });
    }

    // In a real implementation, this would call the AI API (Anthropic/Kimi)
    // For now, we'll return a mock translation
    const translatedText = `[Translated from ${sourceLanguage} to ${targetLanguage}]: ${text}`;

    // Save translation to database
    const translationId = uuidv4();
    const stmt = db.prepare(`
      INSERT INTO translations (id, user_id, original_text, translated_text, source_language, target_language, audio_data)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(translationId, req.userId, text, translatedText, sourceLanguage, targetLanguage, audioData || null);

    res.json({
      id: translationId,
      originalText: text,
      translatedText,
      sourceLanguage,
      targetLanguage,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Get translation history
router.get('/history', authMiddleware, (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const translations = db.prepare(`
      SELECT id, original_text, translated_text, source_language, target_language, created_at
      FROM translations
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(req.userId, parseInt(limit), parseInt(offset));

    const countResult = db.prepare(`
      SELECT COUNT(*) as total FROM translations WHERE user_id = ?
    `).get(req.userId);

    res.json({
      translations,
      total: countResult.total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Get single translation by ID
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const translation = db.prepare(`
      SELECT * FROM translations WHERE id = ? AND user_id = ?
    `).get(req.params.id, req.userId);

    if (!translation) {
      return res.status(404).json({ error: 'Translation not found' });
    }

    res.json({ translation });
  } catch (error) {
    console.error('Get translation error:', error);
    res.status(500).json({ error: 'Failed to fetch translation' });
  }
});

// Delete translation
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const result = db.prepare(`
      DELETE FROM translations WHERE id = ? AND user_id = ?
    `).run(req.params.id, req.userId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Translation not found' });
    }

    res.json({ message: 'Translation deleted successfully' });
  } catch (error) {
    console.error('Delete translation error:', error);
    res.status(500).json({ error: 'Failed to delete translation' });
  }
});

module.exports = router;
