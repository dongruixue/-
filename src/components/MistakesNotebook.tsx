import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Trash2, 
  Play, 
  FileText, 
  Filter, 
  Volume2, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Question, GrammarCategory } from '../types/grammar';
import { speechService } from '../utils/speech';

interface MistakesNotebookProps {
  mistakeQuestions: Question[];
  onRemoveMistake: (id: string) => void;
  onClearAllMistakes: () => void;
  onStartRetest: (questions: Question[]) => void;
  onOpenExplanation: (q: Question) => void;
}

export const MistakesNotebook: React.FC<MistakesNotebookProps> = ({
  mistakeQuestions,
  onRemoveMistake,
  onClearAllMistakes,
  onStartRetest,
  onOpenExplanation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = ['全部', '非谓语动词', '状语从句', '定语从句', '名词性从句', '连词与并列', '独立主格与特殊句型'];

  const filteredQuestions = selectedCategory === '全部'
    ? mistakeQuestions
    : mistakeQuestions.filter(q => q.category === selectedCategory);

  const handlePlaySentence = (sentence: string, answer: string) => {
    const full = sentence.replace(/_{2,}|\[blank\]/gi, answer);
    speechService.speak(full);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              错题攻坚笔记本
            </h2>
            <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
              共 {mistakeQuestions.length} 道错题
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            系统自动收录做错的复合句题目，提供精准针对性的错题重测与考点强化。
          </p>
        </div>

        {mistakeQuestions.length > 0 && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onStartRetest(filteredQuestions)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              开启错题重测 ({filteredQuestions.length})
            </button>

            <button
              onClick={onClearAllMistakes}
              className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="清空所有错题"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Category Filter */}
      {mistakeQuestions.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
          {categories.map((cat) => {
            const count = cat === '全部'
              ? mistakeQuestions.length
              : mistakeQuestions.filter(q => q.category === cat).length;
            if (cat !== '全部' && count === 0) return null;

            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-white hover:bg-amber-50 text-slate-600 border border-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            {mistakeQuestions.length === 0 ? '暂无错题记录！' : '该分类下没有错题！'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {mistakeQuestions.length === 0
              ? '太棒啦！在“互动题库练习”中做错的题目会自动收录到这里，方便后续巩固！'
              : '切换到其他分类或“全部”查看错题。'}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:border-amber-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">#{idx + 1}</span>
                  <span className="font-medium text-amber-700">{q.category}</span>
                  <span>·</span>
                  <span>难度：{q.difficulty}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePlaySentence(q.sentence, q.correctAnswer)}
                    className="flex items-center gap-1 text-slate-500 hover:text-amber-700 transition-colors p-1"
                    title="朗读完整句子"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>朗读</span>
                  </button>

                  <button
                    onClick={() => onRemoveMistake(q.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-emerald-700 transition-colors px-2 py-1 hover:bg-emerald-50 rounded"
                    title="已掌握，从错题本移出"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>已掌握</span>
                  </button>
                </div>
              </div>

              {/* Sentence */}
              <div className="py-3">
                <p className="text-base sm:text-lg font-medium text-slate-900 font-heading">
                  {q.sentence.replace(/_{2,}|\[blank\]/gi, `【 ${q.correctAnswer} 】`)}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  译文：{q.translation}
                </p>
              </div>

              {/* Bottom Quick Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">考点重点：</span>
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {q.explanation.ruleTitle}
                  </span>
                </div>

                <button
                  onClick={() => onOpenExplanation(q)}
                  className="flex items-center gap-1 text-amber-600 font-bold hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>查看详细语法解析 →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
