// import { NewReflectionObject, ReflectionObject } from "../types/journalTypes";
// import { supabase } from "./dBClient";

// export async function createReflection(reflectionData: NewReflectionObject) {
//     const { userId, date, context, takeaway, mood } = reflectionData;
//     try {
//     const { data, error } = await supabase.from('reflections').insert([
//         {
//         user_id: userId,
//         date,
//         reflection_context: context,
//         takeaway,
//         mood,
//         }
//     ]);

//     if (error) {
//         return { error: error.message };
//     }

//     return { data };
//     } catch (err) {
//     return { error: 'An unexpected error occurred while creating the reflection.' };
//     }
// }

// export async function updateReflection(reflectionId: string, updates: any) {
//     try {
//     const { data, error } = await supabase
//         .from('reflections')
//         .update(updates)
//         .eq('id', reflectionId);

//     if (error) {
//         return { error: error.message };
//     }

//     return { data };
//     } catch (err) {
//     return { error: 'An unexpected error occurred while updating the reflection.' };
//     }
// }
// export async function fetchReflectionsById(id: string) {
//     try {
//     const { data, error } = await supabase
//         .from('reflections')
//         .select('*')
//         .eq('id', id)
//         .single();

//     if (error) {
//         return { error: error.message };
//     }

//     return { data };
//     } catch (err) {
//     return { error: 'An unexpected error occurred while fetching the reflection.' };
//     }
// }

