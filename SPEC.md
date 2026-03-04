# Baby Voice Translator - Frontend Specification

## Project Overview
- **Project Name**: Baby Voice Translator (婴儿声音翻译器)
- **Type**: Mobile Web App (React + Tailwind CSS)
- **Core Functionality**: AI-powered baby cry sound recognition and translation
- **Target Users**: Parents, grandparents who want to understand baby's needs

## UI/UX Specification

### Design Theme
- **Color Mode**: Light
- **Primary Color**: #ee2b5b (Soft Pink)
- **Background**: #fcf8f8 (Warm White)
- **Accent Colors**: 
  - Blue: #e0f2fe
  - Pink: #fce7f3  
  - Yellow: #fef3c7

### Typography
- **Font Family**: Plus Jakarta Sans (with Noto Sans SC fallback)
- **Style**: Rounded, friendly, soft

### Layout
- **Device**: Mobile-first (max-width: 430px)
- **Navigation**: Bottom tab bar (Home, History, Wiki, Profile)

### Pages (5 screens)
1. **Home (主页)** - Main recording interface with one-click record button
2. **Recording (正在录音)** - Recording with waveform animation
3. **Result (翻译结果)** - Display translation result with confidence
4. **Language Settings (语言设置)** - Language selection list
5. **History (历史记录)** - List of past translations

## Functionality Specification

### Core Features
- [ ] One-click recording button
- [ ] Audio file upload
- [ ] Recording animation (waveform)
- [ ] Translation result display
- [ ] Confidence percentage
- [ ] Language selection
- [ ] History list
- [ ] Text-to-speech playback

### Technical Stack
- React 18
- Tailwind CSS
- Vite (build tool)

## Acceptance Criteria
- [ ] All 5 pages implemented
- [ ] Responsive mobile layout
- [ ] Smooth animations
- [ ] Bottom navigation works
