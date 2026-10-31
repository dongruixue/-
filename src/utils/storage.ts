import { Question, UserAnswerRecord } from '../types/grammar';
import { INITIAL_QUESTIONS } from '../data/initialQuestions';

const STORAGE_KEYS = {
  QUESTIONS: 'gm_questions_v1',
  MISTAKES: 'gm_mistakes_v1',
  RECORDS: 'gm_user_records_v1',
  STATS: 'gm_stats_v1',
};

export const loadStoredQuestions = (): Question[] => {
  if (typeof window === 'undefined') return INITIAL_QUESTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!raw) return INITIAL_QUESTIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_QUESTIONS;
  } catch (e) {
    console.error('Failed to load stored questions', e);
    return INITIAL_QUESTIONS;
  }
};

export const saveStoredQuestions = (questions: Question[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save questions', e);
  }
};

export const loadMistakeIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveMistakeIds = (ids: string[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save mistake IDs', e);
  }
};

export const addMistakeId = (id: string): string[] => {
  const current = loadMistakeIds();
  if (!current.includes(id)) {
    const updated = [...current, id];
    saveMistakeIds(updated);
    return updated;
  }
  return current;
};

export const removeMistakeId = (id: string): string[] => {
  const current = loadMistakeIds();
  const updated = current.filter(item => item !== id);
  saveMistakeIds(updated);
  return updated;
};

export const loadUserRecords = (): UserAnswerRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveUserRecord = (record: UserAnswerRecord): void => {
  if (typeof window === 'undefined') return;
  try {
    const records = loadUserRecords();
    const updated = [record, ...records.slice(0, 99)];
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save user record', e);
  }
};
