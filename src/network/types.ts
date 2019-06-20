export interface IExerciseRaw {
    created_at: string,
    id: number,
    updated_at: string,
    name: string;
}

export interface IWorkoutRaw {
    created_at: string,
    id: number,
    updated_at: string,
    user_id: number,
    workout_date: string,
    workout_duration: number,
}

export interface ISingleSetRaw {
    created_at: string,
    exercise_id: 2,
    id: number,
    performed_at: string,
    reps: number,
    updated_at: string,
    weight: number,
    workout_id: number,
}
