export type Difficulty = '初级' | '中级' | '高级';

export type GrammarCategory = 
  | '非谓语动词'
  | '状语从句'
  | '定语从句'
  | '名词性从句'
  | '连词与并列'
  | '独立主格与特殊句型';

export interface DistractorAnalysis {
  option: string;
  reason: string;
}

export interface ExamplePair {
  en: string;
  zh: string;
}

export interface GrammarExplanation {
  ruleTitle: string;
  ruleContent: string;
  formula?: string;
  distractorAnalysis: DistractorAnalysis[];
  examples: ExamplePair[];
  mnemonicTip?: string;
  reviewLink?: {
    title: string;
    description: string;
  };
}

export interface Question {
  id: string;
  sentence: string; // contains '___' or '______'
  translation: string;
  options: string[];
  correctAnswer: string;
  category: GrammarCategory;
  difficulty: Difficulty;
  hint: string; // Teacher or kid clue
  explanation: GrammarExplanation;
  createdAt?: number;
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  answeredAt: number;
  attemptsCount: number;
}

export interface QuizSessionStats {
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  streak: number;
  maxStreak: number;
}

export interface GrammarTopicGuide {
  id: string;
  category: GrammarCategory;
  title: string;
  summary: string;
  keyRule: string;
  mnemonic: string;
  comparison: { concept: string; usage: string; example: string }[];
}
