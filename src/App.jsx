import { useState } from 'react'

// 首页
function HomePage({ onStartRecording, onUploadFile }) {
  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-6">
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-soft"></div>
        <div className="absolute inset-4 bg-primary/5 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-tr from-accent-pink to-accent-blue w-32 h-32 rounded-full flex items-center justify-center soft-shadow">
            <span className="material-symbols-outlined text-primary text-6xl">child_care</span>
          </div>
        </div>
      </div>
      <h1 className="text-slate-900 text-3xl font-bold text-center mb-2">听懂宝宝的心声</h1>
      <p className="text-slate-500 text-base text-center max-w-[280px] mb-8">AI 智能识别哭声，解析宝宝的饥饿、困倦或不适</p>
      
      <button 
        onClick={onStartRecording}
        className="w-full flex flex-col items-center justify-center gap-3 py-10 px-6 bg-primary text-white rounded-xl soft-shadow active:scale-95 transition-transform mb-4"
      >
        <div className="bg-white/20 p-4 rounded-full">
          <span className="material-symbols-outlined text-5xl font-bold">mic</span>
        </div>
        <span className="text-xl font-bold tracking-wide">一键录音翻译</span>
      </button>
      
      <button 
        onClick={onUploadFile}
        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white border-2 border-primary/10 text-slate-700 rounded-xl active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-primary">upload_file</span>
        <span className="text-base font-semibold">上传音频文件</span>
      </button>

      <div className="mt-6 w-full bg-accent-yellow/30 p-4 rounded-lg flex items-center gap-4 border border-accent-yellow">
        <div className="bg-accent-yellow rounded-full p-2">
          <span className="material-symbols-outlined text-amber-600 text-sm">lightbulb</span>
        </div>
        <div>
          <p className="text-sm font-medium text-amber-900">温馨小贴士</p>
          <p className="text-xs text-amber-800/70">保持环境安静，翻译效果更准确哦</p>
        </div>
      </div>
    </div>
  )
}

// 录音页面
function RecordingPage({ onStop, isRecording }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-soft"></div>
        <div className={`absolute inset-4 bg-primary/20 rounded-full ${isRecording ? 'animate-pulse' : ''}`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-tr from-accent-pink to-accent-blue w-40 h-40 rounded-full flex items-center justify-center soft-shadow">
            <span className="material-symbols-outlined text-primary text-7xl animate-pulse">mic</span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">正在录音...</h2>
      <p className="text-slate-500 mb-8">请靠近宝宝的声音来源</p>
      
      <button 
        onClick={onStop}
        className="w-24 h-24 flex items-center justify-center bg-primary text-white rounded-full soft-shadow active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-5xl">stop</span>
      </button>
      <p className="mt-4 text-slate-400 text-sm">点击停止</p>
    </div>
  )
}

// 结果页面
function ResultPage({ result, onPlayAudio, onChangeLanguage }) {
  return (
    <div className="flex flex-col items-center px-6 py-8">
      <div className="w-full bg-gradient-to-br from-accent-pink to-accent-blue p-6 rounded-2xl soft-shadow mb-6">
        <div className="text-center mb-4">
          <span className="material-symbols-outlined text-primary text-6xl mb-2">child_care</span>
          <h2 className="text-2xl font-bold text-slate-900">宝宝可能想说</h2>
        </div>
        
        <div className="bg-white/80 rounded-xl p-6 text-center mb-4">
          <p className="text-3xl font-bold text-primary mb-2">{result.text}</p>
          <p className="text-slate-500">{result.description}</p>
        </div>
        
        <div className="flex justify-center items-center gap-2">
          <span className="text-slate-600">置信度:</span>
          <span className="text-primary font-bold">{result.confidence}%</span>
        </div>
      </div>
      
      <div className="w-full flex gap-3 mb-6">
        <button 
          onClick={onPlayAudio}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl"
        >
          <span className="material-symbols-outlined">volume_up</span>
          <span>播放语音</span>
        </button>
        <button 
          onClick={onChangeLanguage}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-primary/10 text-slate-700 rounded-xl"
        >
          <span className="material-symbols-outlined">translate</span>
          <span>换语言</span>
        </button>
      </div>
      
      <div className="w-full bg-accent-yellow/30 p-4 rounded-lg border border-accent-yellow">
        <p className="text-sm font-medium text-amber-900 mb-2">建议</p>
        <p className="text-sm text-amber-800">{result.suggestion}</p>
      </div>
    </div>
  )
}

// 语言设置页面
function LanguagePage({ languages, currentLang, onSelectLang, onBack }) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold text-slate-900 ml-2">语言设置</h2>
      </div>
      
      <div className="space-y-2">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelectLang(lang.code)}
            className={`w-full flex items-center justify-between p-4 rounded-xl ${
              currentLang === lang.code 
                ? 'bg-primary/10 border-2 border-primary' 
                : 'bg-white border-2 border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-slate-900 font-medium">{lang.name}</span>
            </div>
            {currentLang === lang.code && (
              <span className="material-symbols-outlined text-primary">check</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// 历史记录页面
function HistoryPage({ records, onSelectRecord }) {
  return (
    <div className="px-6 py-4">
      <h2 className="text-xl font-bold text-slate-900 mb-6">历史记录</h2>
      
      {records.length === 0 ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-slate-300 text-6xl">history</span>
          <p className="text-slate-400 mt-4">暂无记录</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map(record => (
            <button
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className="w-full bg-white p-4 rounded-xl soft-shadow text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-900">{record.text}</span>
                <span className="text-xs text-slate-400">{record.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">{record.lang}</span>
                <span className="text-sm text-primary">{record.confidence}%</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// 底部导航
function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: 'home', label: '首页' },
    { id: 'history', icon: 'history', label: '记录' },
    { id: 'wiki', icon: 'auto_awesome', label: '百科' },
    { id: 'profile', icon: 'person', label: '我的' },
  ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-slate-100 px-6 pb-8 pt-3 flex justify-between items-center max-w-md mx-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 ${
            activeTab === tab.id ? 'text-primary' : 'text-slate-400'
          }`}
        >
          <span className={`material-symbols-outlined ${activeTab === tab.id ? 'fill-[1]' : ''}`}>
            {tab.icon}
          </span>
          <p className="text-[10px] font-medium">{tab.label}</p>
        </button>
      ))}
    </div>
  )
}

// 主应用
function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [isRecording, setIsRecording] = useState(false)
  
  const mockResult = {
    text: '我饿了',
    description: '宝宝可能感到饥饿',
    confidence: 95,
    suggestion: '可以尝试给宝宝喂奶'
  }
  
  const languages = [
    { code: 'zh', name: '简体中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ]
  
  const mockHistory = [
    { id: 1, text: '我困了', lang: '中文', confidence: 88, time: '10:30' },
    { id: 2, text: 'I want milk', lang: 'English', confidence: 92, time: '昨天' },
  ]
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onStartRecording={() => { setIsRecording(true); setCurrentPage('recording') }}
            onUploadFile={() => setCurrentPage('result')}
          />
        )
      case 'recording':
        return (
          <RecordingPage 
            isRecording={isRecording}
            onStop={() => { setIsRecording(false); setCurrentPage('result') }}
          />
        )
      case 'result':
        return (
          <ResultPage 
            result={mockResult}
            onPlayAudio={() => alert('播放语音')}
            onChangeLanguage={() => setCurrentPage('language')}
          />
        )
      case 'language':
        return (
          <LanguagePage 
            languages={languages}
            currentLang="zh"
            onSelectLang={(code) => { console.log(code); setCurrentPage('result') }}
            onBack={() => setCurrentPage('result')}
          />
        )
      case 'history':
        return (
          <HistoryPage 
            records={mockHistory}
            onSelectRecord={(record) => { console.log(record); setCurrentPage('result') }}
          />
        )
      default:
        return <HomePage />
    }
  }
  
  return (
    <div className="min-h-screen bg-background-light max-w-md mx-auto pb-24">
      {/* Header */}
      {currentPage !== 'recording' && (
        <div className="flex items-center bg-transparent p-4 pb-2 justify-between">
          <div className="text-slate-900 flex size-12 shrink-0 items-center justify-start">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </div>
          <h2 className="text-slate-900 text-lg font-bold text-center flex-1">婴儿翻译器</h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-full h-12 w-12 bg-transparent text-slate-900">
              <span className="material-symbols-outlined text-2xl">notifications</span>
            </button>
          </div>
        </div>
      )}
      
      {renderPage()}
      
      {currentPage !== 'recording' && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={(tab) => { setActiveTab(tab); setCurrentPage(tab === 'home' ? 'home' : 'history') }} 
        />
      )}
    </div>
  )
}

export default App
