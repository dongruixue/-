import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  Check, 
  X, 
  RotateCcw, 
  FileText,
  Send,
  Eye,
  EyeOff
} from 'lucide-react';
import { Question } from '../types/grammar';
import { speechService } from '../utils/speech';

interface QuestionCardProps {
  question: Question;
  selectedOption: string;
  isSubmitted: boolean;
  isCorrect: boolean;
  onSelectOption: (option: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  onOpenExplanation: () => void;
  showTeacherClue?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  isSubmitted,
  isCorrect,
  onSelectOption,
  onSubmit,
  onReset,
  onOpenExplanation,
  showTeacherClue = false,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showClue, setShowClue] = useState(showTeacherClue);
  const [showTranslation, setShowTranslation] = useState(true);

  // Split sentence at the blank
  const blankRegex = /_{2,}|\[blank\]/gi;
  const parts = question.sentence.split(blankRegex);
  const hasPrefix = parts.length > 1;

  const handleAudioPlay = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = isSubmitted
      ? question.sentence.replace(blankRegex, question.correctAnswer)
      : selectedOption
      ? question.sentence.replace(blankRegex, selectedOption)
      : question.sentence.replace(blankRegex, 'something');

    setIsPlayingAudio(true);
    speechService.speak(
      textToSpeak,
      undefined,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 relative transition-all">
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">{question.category}</span>
          <span aria-hidden="true">·</span>
          <span>
            难度：
            <span className={
              question.difficulty === '初级' 
                ? 'text-emerald-700 font-semibold' 
                : question.difficulty === '中级' 
                ? 'text-amber-700 font-semibold' 
                : 'text-indigo-700 font-semibold'
            }>
              {question.difficulty}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Audio Button with sweet girl tone hint */}
          <button
            onClick={handleAudioPlay}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
            title="甜美小女孩发音朗读"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-600" />
                <span>停止</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>女孩发音</span>
              </>
            )}
          </button>

          {/* Translation Toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title="显示/隐藏中文译文"
          >
            {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showTranslation ? '隐藏译文' : '查看译文'}</span>
          </button>

          {/* Clue Toggle */}
          <button
            onClick={() => setShowClue(!showClue)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              showClue
                ? 'bg-amber-100 text-amber-800 font-medium'
                : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
            }`}
            title="获得老师的解题思路提示"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>语法线索</span>
          </button>
        </div>
      </div>

      {/* Teacher / Student Clue Callout */}
      {showClue && (
        <div className="mt-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in duration-150">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">名师思考提示：</span>
            <span>{question.hint}</span>
          </div>
        </div>
      )}

      {/* Main Sentence Stage */}
      <div className="py-7 sm:py-9">
        <div className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed font-heading flex flex-wrap items-baseline gap-x-2 gap-y-3">
          {hasPrefix ? (
            <>
              {parts[0] && <span>{parts[0]}</span>}
              {/* Interactive Blank */}
              <button
                type="button"
                onClick={() => {
                  if (selectedOption && !isSubmitted) {
                    onReset();
                  }
                }}
                disabled={isSubmitted}
                className={`inline-flex items-center justify-center min-w-[120px] sm:min-w-[150px] px-3.5 py-1 mx-1 rounded-xl font-bold transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-500 shadow-xs'
                      : 'bg-rose-100 text-rose-900 border-2 border-rose-500 line-through shadow-xs'
                    : selectedOption
                    ? 'bg-amber-100 text-amber-900 border-2 border-amber-500 shadow-xs ring-2 ring-amber-200'
                    : 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300 hover:border-amber-400'
                }`}
                title={selectedOption ? '点击可清除当前填入项' : '请点击下方按钮选择答案填空'}
              >
                {selectedOption ? (
                  <span className="flex items-center gap-1.5">
                    {selectedOption}
                    {!isSubmitted && (
                      <span className="text-xs text-amber-700/60 font-normal">×</span>
                    )}
                  </span>
                ) : (
                  <span className="text-xs sm:text-sm font-normal text-slate-400">
                    [ 点击下方填空 ]
                  </span>
                )}
              </button>
              {parts[1] && <span>{parts[1]}</span>}
            </>
          ) : (
            <span>{question.sentence}</span>
          )}
        </div>

        {/* Chinese Translation */}
        {showTranslation && (
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal transition-opacity">
            {question.translation}
          </p>
        )}

        {/* Submitted Answer Banner Feedback */}
        {isSubmitted && (
          <div className={`mt-5 p-3.5 rounded-xl border flex items-center justify-between gap-3 text-sm ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <X className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span className="font-semibold">
                {isCorrect ? '太棒了，回答正确！' : `答案有误。正确答案是：“${question.correctAnswer}”`}
              </span>
            </div>

            <button
              onClick={onOpenExplanation}
              className="text-xs font-bold text-slate-800 underline underline-offset-2 hover:text-amber-800 shrink-0 cursor-pointer"
            >
              查看详解卡片 →
            </button>
          </div>
        )}
      </div>

      {/* Option Selection Buttons */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500">
          点击选择语法选项：
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isAnswer = isSubmitted && opt === question.correctAnswer;
            const isWrongSelection = isSubmitted && isSelected && !isCorrect;

            let buttonStyle = 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800';
            if (isSubmitted) {
              if (isAnswer) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-200';
              } else if (isWrongSelection) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-800 line-through';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-300';
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  if (!isSubmitted) {
                    onSelectOption(opt);
                  }
                }}
                disabled={isSubmitted}
                className={`flex items-center justify-start gap-2.5 p-3.5 sm:p-4 rounded-xl border text-sm sm:text-base transition-all cursor-pointer text-left ${buttonStyle}`}
              >
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                  isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {optionLetters[idx] || (idx + 1)}
                </span>
                <span className="font-medium truncate">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          {selectedOption && !isSubmitted && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              清空选择
            </button>
          )}

          {isSubmitted && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-700 font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              重新尝试本题
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSubmitted ? (
            <button
              onClick={onOpenExplanation}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              弹出详解卡片
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!selectedOption}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer ${
                selectedOption
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              提交判定
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
