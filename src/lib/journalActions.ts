import { NewJournalObject } from "../types/journalTypes";
import { supabase } from "./dBClient";

export async function createJournalEntry(journalData: NewJournalObject) {

    const { userId, actions, reflectionText, date, mood } = journalData;
    try {
        const { data, error } = await supabase.from('journal_entries').insert([
        {
            user_id: userId,
            actions,
            reflection_text: reflectionText,
            mood,
            date,
        }
        ]);

        if (error) {
        return { error: error.message };
        }

        return { data };
    } catch (err) {
        return { error: 'An unexpected error occurred while creating the action.' };
    }
}

export async function updateJournalEntry(journalId: string, updates: NewJournalObject) {
    const { userId, actions, reflectionText, mood } = updates;
    try {
        const { data, error } = await supabase
        .from('journal_entries')
        .update({
            user_id: userId,
            actions,
            reflection_text: reflectionText,
            mood
        })
        .eq('id', journalId);

        if (error) {
        return { error: error.message };
        }

        return { data };
    } catch (err) {
        return { error: 'An unexpected error occurred while updating the action.' };
    }
}
export async function fetchJournalEntriesById(id: string) {
    try {
        const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('id', id)
        .single();

        if (error) {
        return { error: error.message };
        }

        return { data };
    } catch (err) {
        return { error: 'An unexpected error occurred while fetching the action.' };
    }
}

export async function fetchJournalEntriesByUserId(userId: string) {
    try {
        const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

        if (error) {
        return { error: error.message };
        }

        return { data };
    } catch (err) {
        return { error: 'An unexpected error occurred while fetching the action.' };
    }
}
