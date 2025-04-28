// import { NewActionObject } from "../types/journalTypes";
// import { supabase } from "./dBClient";

// export async function createAction(actionData: NewActionObject) {
//   const { userId, goalId, name, date } = actionData;
//   try {
//     const { data, error } = await supabase.from('actions').insert([
//       {
//         user_id: userId,
//         goal_id: goalId,
//         name,
//         date,
//         is_completed: false,
//       }
//     ]);

//     if (error) {
//       return { error: error.message };
//     }

//     return { data };
//   } catch (err) {
//     return { error: 'An unexpected error occurred while creating the action.' };
//   }
// }

// export async function updateAction(actionId: string, updates: any) {
//   try {
//     const { data, error } = await supabase
//       .from('actions')
//       .update(updates)
//       .eq('id', actionId);

//     if (error) {
//       return { error: error.message };
//     }

//     return { data };
//   } catch (err) {
//     return { error: 'An unexpected error occurred while updating the action.' };
//   }
// }

// export async function fetchActionsByGoalId(goalId: string) {
//   try {
//     const { data, error } = await supabase
//       .from('actions')
//       .select('*')
//       .eq('goal_id', goalId)
//       .order('date', { ascending: true });

//     if (error) {
//       return { error: error.message };
//     }

//     return { data };
//   } catch (err) {
//     return { error: 'An unexpected error occurred while fetching actions.' };
//   }
// }

// export async function fetchActionsByIds(ids: string[]) {
//   try {
//     const { data, error } = await supabase
//       .from('actions')
//       .select('*')
//       .in('id', ids)
//       .order('date', { ascending: true });

//     if (error) {
//       return { error: error.message };
//     }

//     return { data };
//   } catch (err) {
//     return { error: 'An unexpected error occurred while fetching the action.' };
//   }
// }

// // TODO: Implement the delete action function
// export async function deleteAction(id: string) {
//   try {
//     const { error } = await supabase
//       .from('actions')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       return { error: error.message };
//     }

//     return {};
//   } catch (err) {
//     return { error: 'An unexpected error occurred while deleting the action.' };
//   }
// }
// /*******  2b721d0c-2931-4ee8-96d0-41dd64ce199c  *******/