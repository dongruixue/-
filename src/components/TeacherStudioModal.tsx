import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  RotateCcw, 
  Search, 
  FileCheck,
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';
import { Question, GrammarCategory, Difficulty } from '../types/grammar';
import { INITIAL_QUESTIONS } from '../data/initialQuestions';

interface TeacherStudioProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
  onPreviewQuestion: (q: Question) => void;
}

export const TeacherStudio: React.FC<TeacherStudioProps> = ({
  questions,
  onUpdateQuestions,
  onPreviewQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('全部');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('全部');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State for Adding / Editing Question
  const [formSentence, setFormSentence] = useState('');
  const [formTranslation, setFormTranslation] = useState('');
  const [formCategory, setFormCategory] = useState<GrammarCategory>('状语从句');
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('中级');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formHint, setFormHint] = useState('');
  const [formRuleTitle, setFormRuleTitle] = useState('');
  const [formRuleContent, setFormRuleContent] = useState('');
  const [formMnemonic, setFormMnemonic] = useState('');

  const categories: (GrammarCategory | '全部')[] = [
    '全部',
    '非谓语动词',
    '状语从句',
    '定语从句',
    '名词性从句',
    '连词与并列',
    '独立主格与特殊句型'
  ];

  const difficulties: (Difficulty | '全部')[] = ['全部', '初级', '中级', '高级'];

  const filteredQuestions = questions.filter(q => {
    const matchCat = filterCategory === '全部' || q.category === filterCategory;
    const matchDiff = filterDifficulty === '全部' || q.difficulty === filterDifficulty;
    const matchSearch = searchTerm === '' ||
      q.sentence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.translation.includes(searchTerm) ||
      q.explanation.ruleTitle.includes(searchTerm);
    return matchCat && matchDiff && matchSearch;
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setFormSentence('______ careful, you will not make such simple mistakes.');
    setFormTranslation('只要细心，你就不会犯这样简单的小错误。');
    setFormCategory('状语从句');
    setFormDifficulty('初级');
    setFormOptions(['If', 'Unless', 'Although', 'Because']);
    setFormCorrectIndex(0);
    setFormHint('思考前后句的条件因果关联，后句为一般将来时。');
    setFormRuleTitle('条件状语从句引导词：If 的用法');
    setFormRuleContent('if 意为“如果，假如”，引导条件状语从句。主句使用一般将来时，从句使用一般现在时（主将从现）。');
    setFormMnemonic('如果条件用 if 带，主将从现记心怀！');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (q: Question) => {
    setEditingQuestion(q);
    setFormSentence(q.sentence);
    setFormTranslation(q.translation);
    setFormCategory(q.category);
    setFormDifficulty(q.difficulty);
    setFormOptions([...q.options]);
    const correctIdx = q.options.indexOf(q.correctAnswer);
    setFormCorrectIndex(correctIdx >= 0 ? correctIdx : 0);
    setFormHint(q.hint || '');
    setFormRuleTitle(q.explanation.ruleTitle || '');
    setFormRuleContent(q.explanation.ruleContent || '');
    setFormMnemonic(q.explanation.mnemonicTip || '');
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这道题目吗？')) {
      const updated = questions.filter(q => q.id !== id);
      onUpdateQuestions(updated);
      showNotification('题目已成功删除');
    }
  };

  const handleResetToPreset = () => {
    if (confirm('确定恢复为系统预设题库吗？自定义题目将被重置。')) {
      onUpdateQuestions(INITIAL_QUESTIONS);
      showNotification('已重置为精选预设题库！');
    }
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formSentence.includes('___') && !formSentence.includes('______') && !formSentence.includes('[blank]')) {
      alert('句子中必须包含空格占位符（如 ___ 或 ______）！');
      return;
    }

    const cleanOptions = formOptions.map(o => o.trim()).filter(Boolean);
    if (cleanOptions.length < 2) {
      alert('请至少提供 2 个互相对比的选项！');
      return;
    }

    const correctAnswer = cleanOptions[formCorrectIndex] || cleanOptions[0];

    const distractorAnalysis = cleanOptions
      .filter(o => o !== correctAnswer)
      .map(o => ({
        option: o,
        reason: `${o} 不符合此复合句的语法逻辑或成分要求。`
      }));

    if (editingQuestion) {
      // Update
      const updated = questions.map(q => {
        if (q.id === editingQuestion.id) {
          return {
            ...q,
            sentence: formSentence,
            translation: formTranslation,
            category: formCategory,
            difficulty: formDifficulty,
            options: cleanOptions,
            correctAnswer,
            hint: formHint,
            explanation: {
              ...q.explanation,
              ruleTitle: formRuleTitle || '语法规则考点',
              ruleContent: formRuleContent || '仔细体会句子语意及从句逻辑关系。',
              mnemonicTip: formMnemonic,
              distractorAnalysis,
            }
          };
        }
        return q;
      });
      onUpdateQuestions(updated);
      showNotification('题目修改已保存！');
    } else {
      // Add
      const newQuestion: Question = {
        id: `custom-q-${Date.now()}`,
        sentence: formSentence,
        translation: formTranslation,
        category: formCategory,
        difficulty: formDifficulty,
        options: cleanOptions,
        correctAnswer,
        hint: formHint,
        explanation: {
          ruleTitle: formRuleTitle || '核心语法结构',
          ruleContent: formRuleContent || '仔细体会复合句主从句关联。',
          mnemonicTip: formMnemonic,
          distractorAnalysis,
          examples: [
            {
              en: formSentence.replace(/_{2,}|\[blank\]/gi, correctAnswer),
              zh: formTranslation,
            }
          ]
        },
        createdAt: Date.now()
      };
      onUpdateQuestions([newQuestion, ...questions]);
      showNotification('新题目已成功加入题库！');
    }

    setIsEditorOpen(false);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `grammar_bank_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('题库已成功导出为 JSON 文件');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].sentence) {
          onUpdateQuestions(parsed);
          showNotification(`成功导入 ${parsed.length} 道题目！`);
        } else {
          alert('导入的文件格式不匹配，请确保为标准的题库 JSON。');
        }
      } catch (err) {
        alert('解析 JSON 文件失败，请检查文件格式。');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Banner & Action Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            教师题库管理中心
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            当前题库总量：<span className="font-bold text-amber-700">{questions.length}</span> 道题 · 支持实时增删改查、题库导入与导出备份。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            添加新题目
          </button>

          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-slate-500" />
            导入 JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="导出为 JSON 文件备份"
          >
            <Download className="w-4 h-4 text-slate-500" />
            导出
          </button>

          <button
            onClick={handleResetToPreset}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="重置恢复预设题库"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-slate-400">分类：</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium cursor-pointer"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-400">难度：</span>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium cursor-pointer"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索句子、中文或考点..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3.5 w-12 text-center">#</th>
                <th className="p-3.5">英文复合句 (含空格)</th>
                <th className="p-3.5 w-32">正确选项</th>
                <th className="p-3.5 w-28">分类 / 难度</th>
                <th className="p-3.5 w-28 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuestions.map((q, idx) => (
                <tr key={q.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="p-3.5 text-center text-slate-400 font-mono text-xs">
                    {idx + 1}
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-900">
                      {q.sentence}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {q.translation}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-xs">
                      {q.correctAnswer}
                    </span>
                  </td>
                  <td className="p-3.5 text-xs text-slate-600 space-y-0.5">
                    <div>{q.category}</div>
                    <span className={
                      q.difficulty === '初级' ? 'text-emerald-600' : q.difficulty === '中级' ? 'text-amber-600' : 'text-indigo-600'
                    }>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => onPreviewQuestion(q)}
                      className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="快速预览此题"
                    >
                      <FileCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(q)}
                      className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="编辑题目"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="删除题目"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 font-heading">
                {editingQuestion ? '编辑题目信息' : '添加全新复合句填空题'}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  英文复合句 (用 ___ 表示待填空格) *
                </label>
                <input
                  type="text"
                  required
                  value={formSentence}
                  onChange={(e) => setFormSentence(e.target.value)}
                  placeholder="如：______ tired, she still finished the report."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs sm:text-sm focus:bg-white focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  中文译文 *
                </label>
                <input
                  type="text"
                  required
                  value={formTranslation}
                  onChange={(e) => setFormTranslation(e.target.value)}
                  placeholder="如：虽然感到疲劳，但她仍然完成了这份报告。"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    语法分类
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GrammarCategory)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="状语从句">状语从句</option>
                    <option value="定语从句">定语从句</option>
                    <option value="非谓语动词">非谓语动词</option>
                    <option value="名词性从句">名词性从句</option>
                    <option value="连词与并列">连词与并列</option>
                    <option value="独立主格与特殊句型">独立主格与特殊句型</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    难度标签
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as Difficulty)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="初级">初级</option>
                    <option value="中级">中级</option>
                    <option value="高级">高级</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  设置备选选项 (单选正确答案项)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {formOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 border rounded-lg">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={formCorrectIndex === i}
                        onChange={() => setFormCorrectIndex(i)}
                        className="cursor-pointer text-amber-600"
                        title="勾选设为正确答案"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const next = [...formOptions];
                          next[i] = e.target.value;
                          setFormOptions(next);
                        }}
                        placeholder={`选项 ${['A', 'B', 'C', 'D'][i]}`}
                        className="w-full bg-transparent border-0 focus:outline-hidden text-xs sm:text-sm font-medium"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  * 单选框勾选的项为学生作答时的“正确答案”
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  教学引导思路 / 线索提示 (学生点击“语法线索”时呈现)
                </label>
                <input
                  type="text"
                  value={formHint}
                  onChange={(e) => setFormHint(e.target.value)}
                  placeholder="如：注意前半句与后半句之间的逻辑转折关系"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900 block">
                  详解卡片内容 (学生提交后弹出)
                </span>
                <div>
                  <label className="block text-slate-700 text-xs mb-1">
                    考点规则标题
                  </label>
                  <input
                    type="text"
                    value={formRuleTitle}
                    onChange={(e) => setFormRuleTitle(e.target.value)}
                    placeholder="如：让步状语从句引导词：Although 的用法"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs mb-1">
                    规则通俗解析说明
                  </label>
                  <textarea
                    rows={2}
                    value={formRuleContent}
                    onChange={(e) => setFormRuleContent(e.target.value)}
                    placeholder="针对小学生的清晰通俗说明..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs mb-1">
                    名师易记口诀 (选填)
                  </label>
                  <input
                    type="text"
                    value={formMnemonic}
                    onChange={(e) => setFormMnemonic(e.target.value)}
                    placeholder="如：虽然但是不碰头，转折让步前带头！"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  {editingQuestion ? '保存更新' : '添加题目'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
