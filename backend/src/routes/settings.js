require('dotenv').config();
const express = require('express');

const router = express.Router();

// Supported languages
const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' }
];

// Get all supported languages
router.get('/languages', (req, res) => {
  res.json({
    languages: supportedLanguages,
    count: supportedLanguages.length
  });
});

// Get language by code
router.get('/languages/:code', (req, res) => {
  const language = supportedLanguages.find(lang => lang.code === req.params.code);
  
  if (!language) {
    return res.status(404).json({ error: 'Language not found' });
  }

  res.json({ language });
});

// Get API configuration (public info)
router.get('/config', (req, res) => {
  res.json({
    version: '1.0.0',
    name: 'Baby Voice Translator API',
    features: {
      textTranslation: true,
      audioTranslation: true,
      history: true,
      multipleLanguages: supportedLanguages.length
    },
    supportedLanguages: supportedLanguages.length
  });
});

module.exports = router;
