import React, { useState, useEffect, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  QuestionCard 
} from './components/QuestionCard';
import { 
  ExplanationCard 
} from './components/ExplanationCard';
import { 
  ProjectorModeView 
} from './components/ProjectorModeView';
import { 
  MistakesNotebook 
} from './components/MistakesNotebook';
import { 
  GrammarHandbook 
} from './components/GrammarHandbookModal';
import { 
  TeacherStudio 
} from './components/TeacherStudioModal';
import { 
  ScoreCelebrationModal 
} from './components/ScoreCelebrationModal';
import { 
  VoiceSettingsModal 
} from './components/VoiceSettingsModal';
import { 
  Question, 
  GrammarCategory, 
  Difficulty 
} from './types/grammar';
import { 
  loadStoredQuestions, 
  saveStoredQuestions, 
  loadMistakeIds, 
  addMistakeId, 
  removeMistakeId, 
  saveMistakeIds 
} from './utils/storage';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  RotateCcw, 
  GraduationCap, 
  BookCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<'practice' | 'mistakes' | 'handbook' | 'teacher'>('practice');
  const [mistakeIds, setMistakeIds] = useState<string[]>([]);
  
  // Filtering in Practice View
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('全部');
  
  // Current Question Index
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // User answers per question: { selectedOption, isSubmitted, isCorrect }
  const [answers, setAnswers] = useState<Record<string, { selectedOption: string; isSubmitted: boolean; isCorrect: boolean }>>({});
  
  // Explanation modal state
  const [explanationQuestion, setExplanationQuestion] = useState<{
    question: Question;
    selected: string;
    isCorrect: boolean;
  } | null>(null);

  // Classroom Projector Mode
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);

  // Score celebration modal
  const [isCelebrationOpen, setIsCelebrationOpen] = useState<boolean>(false);

  // Voice Tuning Settings modal
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState<boolean>(false);

  // Initialize questions and mistakes from localStorage
  useEffect(() => {
    const loadedQ = loadStoredQuestions();
    setQuestions(loadedQ);
    const loadedM = loadMistakeIds();
    setMistakeIds(loadedM);
  }, []);

  const handleUpdateQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    saveStoredQuestions(newQuestions);
  };

  // Filtered questions based on category & difficulty
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchCat = selectedCategory === '全部' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === '全部' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });
  }, [questions, selectedCategory, selectedDifficulty]);

  // Adjust currentIndex if out of bounds
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentIndex(filteredQuestions.length - 1);
    }
  }, [filteredQuestions.length, currentIndex]);

  const currentQ = filteredQuestions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] || { selectedOption: '', isSubmitted: false, isCorrect: false } : null;

  // Option selection
  const handleSelectOption = (opt: string) => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: opt,
        isSubmitted: false,
        isCorrect: false,
      }
    }));
  };

  // Reset current question
  const handleResetQuestion = () => {
    if (!currentQ) return;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (!currentQ || !currentAnswer || !currentAnswer.selectedOption) return;

    const isCorrect = currentAnswer.selectedOption.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: currentAnswer.selectedOption,
        isSubmitted: true,
        isCorrect,
      }
    }));

    if (!isCorrect) {
      const updatedMistakes = addMistakeId(currentQ.id);
      setMistakeIds(updatedMistakes);
    }

    // Immediately trigger detailed explanation popup
    setExplanationQuestion({
      question: currentQ,
      selected: currentAnswer.selectedOption,
      isCorrect,
    });
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setExplanationQuestion(null);
    } else {
      setExplanationQuestion(null);
      // If reached end, open score celebration
      setIsCelebrationOpen(true);
    }
  };

  // Session Statistics
  const answeredCount = Object.keys(answers).filter(id => answers[id].isSubmitted).length;
  const correctCount = Object.keys(answers).filter(id => answers[id].isSubmitted && answers[id].isCorrect).length;

  // Missed categories for recommendation
  const missedCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    Object.keys(answers).forEach(id => {
      const ans = answers[id];
      if (ans.isSubmitted && !ans.isCorrect) {
        const found = questions.find(q => q.id === id);
        if (found) {
          categoriesSet.add(found.category);
        }
      }
    });
    return Array.from(categoriesSet);
  }, [answers, questions]);

  // Restart Quiz
  const handleRestartSession = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCelebrationOpen(false);
  };

  // Mistake Notebook operations
  const mistakeQuestions = useMemo(() => {
    return questions.filter(q => mistakeIds.includes(q.id));
  }, [questions, mistakeIds]);

  const handleRemoveMistake = (id: string) => {
    const updated = removeMistakeId(id);
    setMistakeIds(updated);
  };

  const handleClearAllMistakes = () => {
    if (confirm('确定要清空错题本记录吗？')) {
      saveMistakeIds([]);
      setMistakeIds([]);
    }
  };

  const handleStartRetest = (retestQuestions: Question[]) => {
    // Switch to practice mode with first mistake question
    setActiveTab('practice');
    setSelectedCategory('全部');
    setSelectedDifficulty('全部');
    if (retestQuestions.length > 0) {
      const idx = questions.findIndex(q => q.id === retestQuestions[0].id);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  };

  const categoriesList = ['全部', '非谓语动词', '状语从句', '定语从句', '名词性从句', '连词与并列', '独立主格与特殊句型'];
  const difficultiesList = ['全部', '初级', '中级', '高级'];

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-slate-800">
      {/* Universal Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mistakesCount={mistakeIds.length}
        onEnterProjectorMode={() => setIsProjectorMode(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* TAB 1: PRACTICE MODE */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Friendly Kid-Friendly Hero Banner */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 z-10 max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>小学生英语复合句辨析神器</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                  精选语法填空互动闯关
                </h1>
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-light">
                  攻克非谓语动词（doing/done/to do）、从句引导词（that/which/who/where）及状语连词。点击填空，秒级详解！
                </p>
              </div>

              {/* Mascot Image Thumbnail */}
              <div className="relative shrink-0 z-10 w-44 sm:w-56 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg bg-amber-800/30">
                <img
                  src="/src/assets/images/grammar_hero_mascot_1792216003985.jpg"
                  alt="Grammar Owl Mascot"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Decorative background glow */}
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Filter and Session Progress Ribbon */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-4">
              {/* Category Segmented Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-slate-400 font-semibold shrink-0 ml-1 mr-1">分类：</span>
                  {categoriesList.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-amber-600 text-white shadow-2xs font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Difficulty Selector */}
                <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                  <span className="text-slate-400 font-semibold">难度：</span>
                  {difficultiesList.map(diff => (
                    <button
                      key={diff}
                      onClick={() => {
                        setSelectedDifficulty(diff);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        selectedDifficulty === diff
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress and Score Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">
                    题目进度：{filteredQuestions.length > 0 ? currentIndex + 1 : 0} / {filteredQuestions.length}
                  </span>
                  {answeredCount > 0 && (
                    <span className="text-slate-500">
                      已作答：<span className="font-semibold text-slate-800">{answeredCount}</span> 题 (对 {correctCount} 题)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {answeredCount > 0 && (
                    <button
                      onClick={() => setIsCelebrationOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>查看成绩评分 ({correctCount}/{answeredCount})</span>
                    </button>
                  )}

                  <button
                    onClick={handleRestartSession}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="重置当前练习记录"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Core Interactive Question Card */}
            {filteredQuestions.length > 0 && currentQ ? (
              <div className="space-y-4">
                <QuestionCard
                  question={currentQ}
                  selectedOption={currentAnswer?.selectedOption || ''}
                  isSubmitted={currentAnswer?.isSubmitted || false}
                  isCorrect={currentAnswer?.isCorrect || false}
                  onSelectOption={handleSelectOption}
                  onSubmit={handleSubmitAnswer}
                  onReset={handleResetQuestion}
                  onOpenExplanation={() => {
                    setExplanationQuestion({
                      question: currentQ,
                      selected: currentAnswer?.selectedOption || '',
                      isCorrect: currentAnswer?.isCorrect || false,
                    });
                  }}
                />

                {/* Question Navigation Controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      currentIndex === 0
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    上一题
                  </button>

                  {/* Question Number Pills */}
                  <div className="hidden sm:flex items-center gap-1.5 max-w-md overflow-x-auto py-1 scrollbar-none">
                    {filteredQuestions.map((q, idx) => {
                      const state = answers[q.id];
                      let pillClass = 'bg-white border-slate-200 text-slate-600 hover:border-amber-400';
                      if (state?.isSubmitted) {
                        pillClass = state.isCorrect 
                          ? 'bg-emerald-500 text-white border-emerald-600 font-bold'
                          : 'bg-rose-500 text-white border-rose-600 font-bold';
                      } else if (idx === currentIndex) {
                        pillClass = 'bg-amber-600 text-white border-amber-600 font-bold ring-2 ring-amber-300';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-8 h-8 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${pillClass}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      if (currentIndex < filteredQuestions.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        setIsCelebrationOpen(true);
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>{currentIndex === filteredQuestions.length - 1 ? '完成交卷' : '下一题'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
                <BookCheck className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  所选筛选条件下暂无题目
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  请尝试切换分类或难度，或者前往“教师题库管理”添加新题目。
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('全部');
                    setSelectedDifficulty('全部');
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-amber-600 text-white rounded-xl"
                >
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MISTAKES NOTEBOOK */}
        {activeTab === 'mistakes' && (
          <MistakesNotebook
            mistakeQuestions={mistakeQuestions}
            onRemoveMistake={handleRemoveMistake}
            onClearAllMistakes={handleClearAllMistakes}
            onStartRetest={handleStartRetest}
            onOpenExplanation={(q) => {
              setExplanationQuestion({
                question: q,
                selected: '',
                isCorrect: false,
              });
            }}
          />
        )}

        {/* TAB 3: GRAMMAR HANDBOOK */}
        {activeTab === 'handbook' && (
          <GrammarHandbook
            onPracticeCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('practice');
              setCurrentIndex(0);
            }}
          />
        )}

        {/* TAB 4: TEACHER STUDIO */}
        {activeTab === 'teacher' && (
          <TeacherStudio
            questions={questions}
            onUpdateQuestions={handleUpdateQuestions}
            onPreviewQuestion={(q) => {
              setActiveTab('practice');
              setSelectedCategory('全部');
              setSelectedDifficulty('全部');
              const idx = questions.findIndex(item => item.id === q.id);
              if (idx !== -1) setCurrentIndex(idx);
            }}
          />
        )}
      </main>

      {/* POPUP EXPLANATION CARD (Requirement 3: 弹出“详解卡片”) */}
      {explanationQuestion && (
        <ExplanationCard
          question={explanationQuestion.question}
          userSelection={explanationQuestion.selected}
          isCorrect={explanationQuestion.isCorrect}
          onClose={() => setExplanationQuestion(null)}
          onNext={() => {
            setExplanationQuestion(null);
            handleNextQuestion();
          }}
          onRedo={() => {
            setExplanationQuestion(null);
            handleResetQuestion();
          }}
          hasNextQuestion={currentIndex < filteredQuestions.length - 1}
        />
      )}

      {/* SCORE CELEBRATION MODAL (Requirement 6: 学习激励显示评分与复习建议) */}
      {isCelebrationOpen && (
        <ScoreCelebrationModal
          score={correctCount}
          total={Math.max(answeredCount, 1)}
          onRestart={handleRestartSession}
          onGoToMistakes={() => {
            setIsCelebrationOpen(false);
            setActiveTab('mistakes');
          }}
          onGoToHandbook={() => {
            setIsCelebrationOpen(false);
            setActiveTab('handbook');
          }}
          onClose={() => setIsCelebrationOpen(false)}
          missedCategories={missedCategories}
        />
      )}

      {/* CLASSROOM PROJECTOR FULLSCREEN VIEW (Requirement 5: 适合课堂投影) */}
      {isProjectorMode && (
        <ProjectorModeView
          questions={filteredQuestions.length > 0 ? filteredQuestions : questions}
          currentIndex={currentIndex}
          onSelectIndex={(newIdx) => setCurrentIndex(newIdx)}
          onExit={() => setIsProjectorMode(false)}
          onOpenExplanation={(q, selected, isCorrect) => {
            setExplanationQuestion({
              question: q,
              selected,
              isCorrect,
            });
          }}
        />
      )}

      {/* VOICE TUNING SETTINGS MODAL */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

      {/* Quiet Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200/80 bg-white/70 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>GrammarMaster · 专为小学生与课堂设计的英语语法填空教学系统</span>
          <span>支持智能语音朗读 · 教师题库自定义 · 白板大屏投影</span>
        </div>
      </footer>
    </div>
  );
}
