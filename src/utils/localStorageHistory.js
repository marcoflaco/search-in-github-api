import { HISTORY_KEY } from '../constants';

export function getHistory() {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

export function updateHistory(query) {
  const history = getHistory();
  const newHistory = [...new Set([query, ...history])];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}
