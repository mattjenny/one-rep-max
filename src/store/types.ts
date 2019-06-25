export interface IState {
    exercises: Array<IExercise>;
    user?: IUser;
    workouts: Array<IWorkout>;
    singleSets: Array<ISingleSet>;
    selectedExerciseId?: number;
    loading: boolean;
}

export interface IUser {
    id: number;
    email: string;
}

export interface IExercise {
    id: number;
    name: string;
}

export type ExerciseMap = { [exerciseId: number]: IExercise }

export interface IWorkout {
    id: number,
    userId:number,
    workoutDate: Date,
    workoutDuration: number,
}

export type WorkoutMap = { [workoutId: number]: IWorkout }

export interface ISingleSet {
    exerciseId: number,
    id: number,
    performedAt: Date,
    reps: number,
    weight: number,
    workoutId: number,
    theoreticalOneRepMax: number,
}

export interface IDisplayExercise {
    id: number,
    name: string,
    theoreticalOneRepMax: number,
    mostRecentDate: Date,
}

export interface IWorkoutExercise {
    workoutId: number;
    x: Date;
    y: number;
    label: string;
    setCount: number;
    reps: number;
    weight: number;

    /* Count of sets with different weight/ reps to give more accurate summary */
    setsWithDifferentMax: number;
}

export interface IDataPoint {
    x: Date,
    y: number,
}
