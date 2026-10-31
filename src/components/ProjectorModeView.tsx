import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  Check, 
  RotateCcw,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';
import { Question } from '../types/grammar';
import { speechService } from '../utils/speech';

interface ProjectorModeViewProps {
  questions: Question[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onExit: () => void;
  onOpenExplanation: (q: Question, selected: string, isCorrect: boolean) => void;
}

export const ProjectorModeView: React.FC<ProjectorModeViewProps> = ({
  questions,
  currentIndex,
  onSelectIndex,
  onExit,
  onOpenExplanation,
}) => {
  const currentQ = questions[currentIndex];
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [showClue, setShowClue] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Reset local state when navigating questions
  useEffect(() => {
    setSelectedOption('');
    setIsRevealed(false);
    setShowClue(false);
    speechService.stop();
    setIsPlayingAudio(false);
  }, [currentIndex]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        onSelectIndex(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
      } else if (e.key === 'Escape') {
        onExit();
      } else if (['1', '2', '3', '4'].includes(e.key) && currentQ) {
        const idx = parseInt(e.key) - 1;
        if (currentQ.options[idx]) {
          setSelectedOption(currentQ.options[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, currentQ, onSelectIndex, onExit]);

  if (!currentQ) return null;

  const blankRegex = /_{2,}|\[blank\]/gi;
  const parts = currentQ.sentence.split(blankRegex);
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleAudioPlay = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = isRevealed
      ? currentQ.sentence.replace(blankRegex, currentQ.correctAnswer)
      : selectedOption
      ? currentQ.sentence.replace(blankRegex, selectedOption)
      : currentQ.sentence.replace(blankRegex, 'blank');

    setIsPlayingAudio(true);
    speechService.speak(
      textToSpeak,
      undefined,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const isSelectedCorrect = selectedOption === currentQ.correctAnswer;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top Classroom Bar */}
      <div className="h-20 px-6 sm:px-10 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold font-heading text-amber-400">
              课堂投影白板模式
            </span>
            <span className="text-sm text-slate-400 ml-2">
              第 {currentIndex + 1} / {questions.length} 题
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span>{currentQ.category}</span>
            <span>·</span>
            <span>难度：{currentQ.difficulty}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowClue(!showClue)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              showClue
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>{showClue ? '隐藏思路' : '课堂启发思路'}</span>
          </button>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden sm:inline">{showTranslation ? '隐藏译文' : '显示译文'}</span>
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
            title="退出投影模式 (Esc)"
          >
            <X className="w-4 h-4" />
            <span>退出</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Screen Stage */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-12 py-8 flex flex-col justify-center items-center text-center">
        {/* Optional Hint Banner */}
        {showClue && (
          <div className="mb-6 p-4 max-w-3xl w-full bg-amber-950/70 border border-amber-600/60 rounded-2xl text-amber-200 text-sm sm:text-base leading-relaxed animate-in fade-in">
            <span className="font-bold text-amber-400">💡 教师教学线索：</span>
            <span>{currentQ.hint}</span>
          </div>
        )}

        {/* Big Giant Sentence for Projector */}
        <div className="text-2xl sm:text-4xl md:text-5xl font-medium font-heading leading-relaxed text-slate-100 max-w-4xl tracking-wide flex flex-wrap justify-center items-baseline gap-x-3 gap-y-4">
          {parts[0] && <span>{parts[0]}</span>}
          
          {/* Super Big Interactive Blank */}
          <div className={`inline-flex items-center justify-center min-w-[200px] sm:min-w-[260px] px-5 py-2 rounded-2xl text-2xl sm:text-4xl font-bold transition-all ${
            isRevealed
              ? 'bg-emerald-600/30 text-emerald-300 border-3 border-emerald-400 shadow-lg'
              : selectedOption
              ? 'bg-amber-500/20 text-amber-300 border-3 border-amber-400 shadow-md ring-4 ring-amber-500/20'
              : 'bg-slate-800/80 text-slate-500 border-3 border-dashed border-slate-600'
          }`}>
            {isRevealed ? (
              <span className="flex items-center gap-2">
                {currentQ.correctAnswer}
                <Check className="w-7 h-7 text-emerald-400" />
              </span>
            ) : selectedOption ? (
              <span>{selectedOption}</span>
            ) : (
              <span className="text-xl sm:text-2xl text-slate-500 font-normal">
                [ 请点击选项填入 ]
              </span>
            )}
          </div>

          {parts[1] && <span>{parts[1]}</span>}
        </div>

        {/* Big Audio Read & Translation */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={handleAudioPlay}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-base font-semibold transition-all cursor-pointer"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-5 h-5" /> 停止发音
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" /> 甜美小女孩发音朗读
              </>
            )}
          </button>

          {showTranslation && (
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl font-light">
              {currentQ.translation}
            </p>
          )}
        </div>

        {/* Big Classroom Touch-Friendly Option Cards */}
        <div className="mt-10 max-w-4xl w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isAnswer = opt === currentQ.correctAnswer;

            let cardStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-amber-400';
            if (isRevealed) {
              if (isAnswer) {
                cardStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-300 ring-4 ring-emerald-500/30 font-bold';
              } else if (isSelected && !isSelectedCorrect) {
                cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-300 line-through';
              } else {
                cardStyle = 'bg-slate-900/50 border-slate-800 text-slate-600';
              }
            } else if (isSelected) {
              cardStyle = 'bg-amber-950/80 border-amber-400 text-amber-300 ring-4 ring-amber-500/30 font-bold';
            }

            return (
              <button
                key={opt}
                onClick={() => {
                  if (!isRevealed) {
                    setSelectedOption(opt);
                  }
                }}
                className={`flex items-center justify-start gap-4 p-5 rounded-2xl border-2 text-xl sm:text-2xl font-medium transition-all cursor-pointer ${cardStyle}`}
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  {optionLetters[i]}
                </span>
                <span className="truncate">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Classroom Teacher Toolbar */}
      <div className="h-24 px-6 sm:px-12 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-4">
        {/* Prev / Next Question */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
              currentIndex === 0
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            上一题
          </button>

          <button
            onClick={() => onSelectIndex(Math.min(questions.length - 1, currentIndex + 1))}
            disabled={currentIndex === questions.length - 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
              currentIndex === questions.length - 1
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            下一题
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Central Teacher Operations */}
        <div className="flex items-center gap-3">
          {selectedOption && !isRevealed && (
            <button
              onClick={() => setSelectedOption('')}
              className="px-3.5 py-2 text-sm text-slate-400 hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              清空
            </button>
          )}

          <button
            onClick={() => setIsRevealed(!isRevealed)}
            className={`px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all shadow-md cursor-pointer ${
              isRevealed
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRevealed ? '隐藏判定' : '揭晓正确答案'}
          </button>

          <button
            onClick={() => onOpenExplanation(currentQ, selectedOption, isSelectedCorrect)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-base bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md cursor-pointer"
          >
            <FileText className="w-5 h-5" />
            查看大屏教学解析
          </button>
        </div>
      </div>
    </div>
  );
};
