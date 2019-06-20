export interface IState {
    exercises: Array<IExercise>;
    user?: IUser;
    workouts: Array<IWorkout>;
    singleSets: Array<ISingleSet>;
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
    workoutDate: string,
    workoutDuration: number,
}

export type WorkoutMap = { [workoutId: number]: IWorkout }

export interface ISingleSet {
    exerciseId: number,
    id: number,
    performedAt: string,
    reps: number,
    weight: number,
    workoutId: number,
    theoreticalOneRepMax: number,
}
