import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import dayjs from 'dayjs';

interface StreakState {
  streak: number;
  lastCheckedIn: string | null;
  history: Record<string, StreakHistoryEntry>;
  incrementStreak: () => void;
  resetStreak: () => void;
  addJournalEntry: (date: string, entry: string) => void;
}

interface StreakHistoryEntry {
  success: boolean;
  journalEntry?: string;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastCheckedIn: null,
      history: {},
      
      incrementStreak: () => {
        const today = dayjs().format('YYYY-MM-DD');
        const lastCheckedIn = get().lastCheckedIn;
        
        // If already checked in today, do nothing
        if (lastCheckedIn === today) return;
        
        // Update streak and history
        set((state) => {
          const newHistory = { ...state.history };
          newHistory[today] = { success: true };
          
          return {
            streak: state.streak + 1,
            lastCheckedIn: today,
            history: newHistory
          };
        });
      },
      
      resetStreak: () => {
        const today = dayjs().format('YYYY-MM-DD');
        
        set((state) => {
          const newHistory = { ...state.history };
          newHistory[today] = { success: false };
          
          return {
            streak: 0,
            lastCheckedIn: today,
            history: newHistory
          };
        });
      },
      
      addJournalEntry: (date, entry) => {
        set((state) => {
          const newHistory = { ...state.history };
          const currentEntry = newHistory[date] || { success: true };
          newHistory[date] = { ...currentEntry, journalEntry: entry };
          
          return {
            history: newHistory
          };
        });
      }
    }),
    {
      name: 'upbrain-streak-storage'
    }
  )
);