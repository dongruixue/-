import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  BookMarked, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  ExternalLink,
  X
} from 'lucide-react';
import { Question } from '../types/grammar';
import { speechService } from '../utils/speech';

interface ExplanationCardProps {
  question: Question;
  userSelection: string;
  isCorrect: boolean;
  onNext?: () => void;
  onRedo?: () => void;
  onClose?: () => void;
  hasNextQuestion?: boolean;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  question,
  userSelection,
  isCorrect,
  onNext,
  onRedo,
  onClose,
  hasNextQuestion = true,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const fullSentenceWithAnswer = question.sentence.replace(/_{2,}|\[blank\]/gi, question.correctAnswer);

  const handlePlayAudio = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speechService.speak(
      fullSentenceWithAnswer,
      undefined,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="explanation-dialog-title"
      >
        {/* Top Status Header */}
        <div className={`p-4 sm:p-6 border-b flex items-start justify-between gap-4 ${
          isCorrect ? 'bg-emerald-50/70 border-emerald-100' : 'bg-rose-50/70 border-rose-100'
        }`}>
          <div className="flex items-start gap-3.5">
            <div className={`p-2 rounded-xl mt-0.5 ${
              isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-base font-bold font-heading ${
                  isCorrect ? 'text-emerald-800' : 'text-rose-800'
                }`} id="explanation-dialog-title">
                  {isCorrect ? '回答正确！精准掌握考点' : '回答有误，一起来攻克它！'}
                </span>
                <span className="text-xs text-slate-500">
                  {question.category} · {question.difficulty}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                你的选择：<span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-600 line-through'}`}>{userSelection || '未作答'}</span>
                {!isCorrect && (
                  <span className="ml-2 text-slate-800">
                    正确答案：<span className="font-bold text-emerald-700 underline underline-offset-2">{question.correctAnswer}</span>
                  </span>
                )}
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="关闭解析"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-800 text-sm">
          {/* Full Sentence Audio & Translation */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">完整正确复合句</span>
              <button
                onClick={handlePlayAudio}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                title="甜美女孩原声发音"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" /> 停止朗读
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-600" /> 女孩原声朗读
                  </>
                )}
              </button>
            </div>
            <p className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
              {fullSentenceWithAnswer}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              中文译文：{question.translation}
            </p>
          </div>

          {/* Grammar Rule Box */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>考点精讲：{question.explanation.ruleTitle}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-2">
              <p>{question.explanation.ruleContent}</p>
              {question.explanation.formula && (
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-xs text-amber-900 font-semibold">
                  句型结构：{question.explanation.formula}
                </div>
              )}
            </div>
          </div>

          {/* Distractor Analysis: 易混淆项深度辨析 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-sm">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>常见错误与易混淆项辨析</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.explanation.distractorAnalysis.map((item, idx) => {
                const isSelectedByUser = item.option === userSelection;
                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-lg border text-xs leading-relaxed transition-colors ${
                      isSelectedByUser
                        ? 'bg-rose-50/60 border-rose-200 ring-1 ring-rose-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">
                        选项 “{item.option}”
                      </span>
                      {isSelectedByUser && (
                        <span className="text-[10px] text-rose-700 font-bold bg-rose-100 px-1.5 py-0.5 rounded">
                          你选的错项
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600">{item.reason}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Example Sentences */}
          {question.explanation.examples && question.explanation.examples.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-sm">
                <BookMarked className="w-4 h-4 text-emerald-600" />
                <span>经典真比例句拓展</span>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
                {question.explanation.examples.map((ex, i) => (
                  <div key={i} className="pb-2 border-b border-slate-200/60 last:border-0 last:pb-0">
                    <p className="font-medium text-slate-900">{ex.en}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{ex.zh}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mnemonic Tip: 名师口诀 */}
          {question.explanation.mnemonicTip && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm flex items-start gap-2.5 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">名师速记锦囊：</span>
                <span className="ml-1 font-medium">{question.explanation.mnemonicTip}</span>
              </div>
            </div>
          )}

          {/* Review Link / Tip */}
          {question.explanation.reviewLink && (
            <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-center justify-between gap-3">
              <div>
                <span className="font-bold">{question.explanation.reviewLink.title}</span>
                <p className="text-indigo-700 text-[11px] mt-0.5">{question.explanation.reviewLink.description}</p>
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-200 shrink-0">
                推荐复习
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3">
          {onRedo ? (
            <button
              onClick={onRedo}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              清空重做
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                收起解析
              </button>
            )}

            {onNext && hasNextQuestion && (
              <button
                onClick={onNext}
                className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                进入下一题
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
