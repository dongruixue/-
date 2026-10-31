import React, { useState } from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Search,
  ExternalLink
} from 'lucide-react';
import { GRAMMAR_HANDBOOK_TOPICS } from '../data/grammarHandbook';
import { GrammarCategory } from '../types/grammar';

interface GrammarHandbookProps {
  onPracticeCategory: (cat: GrammarCategory) => void;
}

export const GrammarHandbook: React.FC<GrammarHandbookProps> = ({
  onPracticeCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  const categories = ['全部', '非谓语动词', '定语从句', '状语从句'];

  const filteredTopics = GRAMMAR_HANDBOOK_TOPICS.filter(t => {
    const matchesCat = activeCategory === '全部' || t.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.mnemonic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              英语复合句语法宝典
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              专为小学生量身定制的速记口诀、易混淆辨析对比表与典型例句
            </p>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索语法点或口诀..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Topic Cards */}
      <div className="space-y-6">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
          >
            {/* Topic Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/40">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                  {topic.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 mt-1.5">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {topic.summary}
                </p>
              </div>

              <button
                onClick={() => onPracticeCategory(topic.category)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                <span>练这组题</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm text-slate-700">
              {/* Mnemonic Pill */}
              <div className="p-4 bg-amber-100/60 rounded-xl border border-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-900 text-sm">
                    名师易记口诀
                  </div>
                  <div className="text-amber-800 font-medium mt-1 leading-relaxed">
                    {topic.mnemonic}
                  </div>
                </div>
              </div>

              {/* Core Rule */}
              <div className="space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>核心判定原则</span>
                </div>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 leading-relaxed text-slate-700">
                  {topic.keyRule}
                </p>
              </div>

              {/* Comparison Matrix Table */}
              <div className="space-y-2">
                <div className="font-bold text-slate-900">
                  易混淆项对照辨析表
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="p-2.5 sm:p-3 w-1/4">结构类型</th>
                        <th className="p-2.5 sm:p-3 w-2/5">使用规则与特征</th>
                        <th className="p-2.5 sm:p-3 w-1/3">典范例句</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {topic.comparison.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="p-2.5 sm:p-3 font-semibold text-slate-900 align-top">
                            {row.concept}
                          </td>
                          <td className="p-2.5 sm:p-3 text-slate-600 align-top leading-relaxed">
                            {row.usage}
                          </td>
                          <td className="p-2.5 sm:p-3 text-slate-800 font-mono text-[11px] align-top bg-slate-50/40">
                            {row.example}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
