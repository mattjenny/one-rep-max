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
        workoutDate: workout.workout_date,
        workoutDuration: workout.workout_duration,
    };
}

export function toSingleSet(singleSet: ISingleSetRaw): ISingleSet {
    return {
        exerciseId: singleSet.exercise_id,
        id: singleSet.id,
        performedAt: singleSet.performed_at,
        reps: singleSet.reps,
        weight: singleSet.weight,
        workoutId: singleSet.workout_id,
        theoreticalOneRepMax: getOneRepMax(singleSet.weight, singleSet.reps),
    };
}

// Using Brzycki formula
function getOneRepMax(weight: number, reps: number) {
    return weight * (36.0 / (37 - reps));
}