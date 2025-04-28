import { create } from 'zustand';
import { JournalObject, NewJournalObject } from '../types/journalTypes';
import { createJournalEntry, updateJournalEntry, fetchJournalEntriesById, fetchJournalEntriesByUserId } from '../lib/journalActions';

interface JournalState {
  journalEntries: JournalObject[];
  loading: boolean;
  handleCreateJournalEntry: (journalData: NewJournalObject) => Promise<{ data?: any; error?: string }>;
  handleUpdateJournalEntry: (journalId: string, updates: NewJournalObject) => Promise<{ data?: any; error?: string }>;
  handleFetchJournalEntryById: (journalId: string) => Promise<{ data?: JournalObject | null; error?: string }>;
  handleFetchJournalEntriesByUser: (userId: string) => Promise<{ data?: JournalObject[] | null; error?: string }>;
}

export const useJournalStore = create<JournalState>((set) => ({
  journalEntries: [],
  loading: true,

  handleCreateJournalEntry: async (journalData: NewJournalObject) => {
    const { data, error } = await createJournalEntry(journalData);
    if (!error && data) {
      set((state) => ({ journalEntries: [...state.journalEntries, data] }));
    }
    return { data, error };
  },

  handleUpdateJournalEntry: async (journalId: string, updates: NewJournalObject) => {
    const { data, error } = await updateJournalEntry(journalId, updates);
    if (!error && data) {
      set((state) => ({
        journalEntries: state.journalEntries.map(entry => 
          entry.id === journalId ? data : entry
        )
      }));
    }
    return { data, error };
  },

  handleFetchJournalEntryById: async (journalId: string) => {
    const { data, error } = await fetchJournalEntriesById(journalId);
    return { data, error };
  },

  handleFetchJournalEntriesByUser: async (userId: string) => {
    const { data, error } = await fetchJournalEntriesByUserId(userId);
    if (!error) {
      set({ journalEntries: data || [], loading: false });
    }
    return { data, error };
  }
}));
