import {
    IExerciseRaw,
    IWorkoutRaw,
    ISingleSetRaw,
} from '../network/types';
import {
    IExercise,
    IWorkout,
    ISingleSet,
} from './types';

export function toExercise(exercise: IExerciseRaw): IExercise {
    return {
        id: exercise.id,
        name: exercise.name,
    };
}

export function toWorkout(workout: IWorkoutRaw): IWorkout {
    return {
        id: workout.id,
        userId: workout.user_id,
        workoutDate: new Date(workout.workout_date),
        workoutDuration: workout.workout_duration,
    };
}

export function toSingleSet(singleSet: ISingleSetRaw): ISingleSet {
    return {
        exerciseId: singleSet.exercise_id,
        id: singleSet.id,
        performedAt: new Date(singleSet.performed_at),
        reps: singleSet.reps,
        weight: singleSet.weight,
        workoutId: singleSet.workout_id,
        theoreticalOneRepMax: getOneRepMax(singleSet.weight, singleSet.reps),
    };
}

// Using Brzycki formula
export function getOneRepMax(weight: number, reps: number) {
    return weight * (36.0 / (37 - reps));
}

export function toDisplayNumber(value: number) {
    if (value > 1000) {
        return Math.round(value*10) / 10;
    }
    return Math.round(value*1e2) / 1e2;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function getDateStr(d: number, includeYear = false): string {
    const date = new Date(d);
    return `${months[date.getMonth()]} ${date.getDate()}${includeYear ? ` ${date.getFullYear()}` : ''}`
}