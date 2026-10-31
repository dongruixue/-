import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Star, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  BookmarkCheck, 
  Sparkles, 
  X,
  CheckCircle2
} from 'lucide-react';

interface ScoreCelebrationModalProps {
  score: number;
  total: number;
  onRestart: () => void;
  onGoToMistakes: () => void;
  onGoToHandbook: () => void;
  onClose: () => void;
  missedCategories?: string[];
}

export const ScoreCelebrationModal: React.FC<ScoreCelebrationModalProps> = ({
  score,
  total,
  onRestart,
  onGoToMistakes,
  onGoToHandbook,
  onClose,
  missedCategories = [],
}) => {
  const percentage = Math.round((score / total) * 100);

  // Determine star rating (1 to 3 stars)
  const starCount = percentage >= 90 ? 3 : percentage >= 60 ? 2 : 1;

  useEffect(() => {
    // Fire confetti for high achievements
    if (percentage >= 60) {
      confetti({
        particleCount: percentage >= 80 ? 100 : 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899'],
      });
    }
  }, [percentage]);

  const getEncouragementText = () => {
    if (percentage === 100) {
      return {
        badge: '🏆 卓越语法大师',
        title: '太震撼了！全对满分通关！',
        desc: '你对英语复合句的定语从句、状语从句与非谓语结构理解得非常深刻，完全具备初中高阶语法功底！继续保持！'
      };
    }
    if (percentage >= 80) {
      return {
        badge: '🎉 语法优等生',
        title: '成绩优异，复合句辨析能力超强！',
        desc: '绝大部分高难度考点你都答对了！仔细查看错题卡片，查漏补缺后你就是满分大师！'
      };
    }
    if (percentage >= 60) {
      return {
        badge: '💪 语法小探险家',
        title: '稳步进阶，核心规则已掌握！',
        desc: '基础语法概念很扎实，在区分主动/被动分词以及从句引导词时再细心一点，就能更上一层楼！'
      };
    }
    return {
      badge: '🌱 勤奋小学者',
      title: '每一次练习都是进步的起点！',
      desc: '复合句是英语学习的关键难关，不要灰心！结合“语法复习宝典”中的名师口诀再做一遍，你会发现豁然开朗！'
    };
  };

  const advice = getEncouragementText();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-amber-200/80 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="bg-gradient-to-b from-amber-500 to-amber-600 text-white p-6 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{advice.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            本次练习评分结果
          </h2>

          {/* Big Score Counter */}
          <div className="mt-4 flex items-baseline justify-center gap-1 font-heading">
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">
              {score}
            </span>
            <span className="text-2xl sm:text-3xl font-semibold opacity-80">
              / {total}
            </span>
            <span className="ml-3 text-lg font-bold bg-white/25 px-2.5 py-0.5 rounded-lg">
              {percentage}%
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 ${
                  star <= starCount
                    ? 'fill-amber-200 text-amber-200 drop-shadow-md scale-110'
                    : 'text-amber-300/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-slate-800">
          <div className="text-center space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {advice.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              {advice.desc}
            </p>
          </div>

          {/* Review Recommendations */}
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>专项语法提升建议</span>
            </div>

            {missedCategories.length > 0 ? (
              <div className="text-xs text-slate-700 space-y-1.5">
                <p>建议重点复习以下错题高发板块：</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {missedCategories.map((cat, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-white rounded-lg border border-amber-300 font-medium text-amber-900 shadow-2xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                太棒了！各个语法板块均答题准确。可浏览语法宝典进一步探究独立主格与虚拟语气的拔高拓展！
              </p>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={onGoToMistakes}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4 text-amber-600" />
              进入错题本
            </button>

            <button
              onClick={onGoToHandbook}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              复习语法宝典
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            再练一轮 (重置答题)
          </button>
        </div>
      </div>
    </div>
  );
};
