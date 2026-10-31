import React from 'react';
import { Sparkles, Monitor, BookOpen, BookmarkCheck, Settings, GraduationCap } from 'lucide-react';

interface HeaderProps {
  activeTab: 'practice' | 'mistakes' | 'handbook' | 'teacher';
  setActiveTab: (tab: 'practice' | 'mistakes' | 'handbook' | 'teacher') => void;
  mistakesCount: number;
  onEnterProjectorMode: () => void;
  onOpenVoiceSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  mistakesCount,
  onEnterProjectorMode,
  onOpenVoiceSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <button 
            onClick={() => setActiveTab('practice')}
            className="text-left group"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors font-heading whitespace-nowrap">
              GrammarMaster
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('practice')}
            className={`transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'practice'
                ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            互动题库练习
          </button>

          <button
            onClick={() => setActiveTab('mistakes')}
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mistakes'
                ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            错题本
            {mistakesCount > 0 && (
              <span className="text-xs bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded-full">
                {mistakesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('handbook')}
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'handbook'
                ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            语法复习宝典
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'teacher'
                ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5'
                : 'hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            教师题库管理
          </button>
        </nav>

        {/* Zone 3: Primary Action & Voice Tuning */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenVoiceSettings}
            className="flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium text-slate-700 hover:text-amber-700 bg-white hover:bg-amber-50 border border-slate-200 rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            title="调节发音音色（小女孩发音/语速调校）"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>女孩音色</span>
          </button>

          <button
            onClick={onEnterProjectorMode}
            className="flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold text-slate-800 bg-amber-100/80 hover:bg-amber-200 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            title="切换为适合白板或教室投影仪的大字演示模式"
          >
            <Monitor className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">切换</span>课堂投影模式
          </button>
        </div>
      </div>
    </header>
  );
};
