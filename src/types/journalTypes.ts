type RemoveIdField<Type> = {
    [Property in keyof Type as Exclude<Property, "id">]: Type[Property]
};

export type GoalObject = {
    id: string;
    userId: string;
    name: string;
    description: string;
    startDate: string;
    targetDate: string;
    actions: string[];
}

export type NewGoalObject = RemoveIdField<GoalObject>;


export type ActionObject = {
    // id: string;
    // userId: string;
    goalId: string;
    name: string;
    // date: string;
    is_completed: boolean;
};


// export type NewActionObject = RemoveIdField<ActionObject>;

// export type ReflectionObject = {
//   userId: string;
//   date: string;
//   context: string;
//   takeaway: string;
//   mood: string;
// }

// export type NewReflectionObject = RemoveIdField<ReflectionObject>;

export type JournalObject = {
  id: string;
  userId: string;
  date: string;
  reflectionText: string;
  actions: ActionObject[];
  mood: Mood;
}
export type NewJournalObject = RemoveIdField<JournalObject>;

export enum Mood {
  Happy = 'Happy',
  sad = 'Sad',
  anxious =  'Anxious',
  excited =  'Excited',
  calm =  'Calm',
  tired =  'Tired',
  stressed =  'Stressed',
  motivated =  'Motivated'
}
