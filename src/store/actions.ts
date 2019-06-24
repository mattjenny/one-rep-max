import { 
    INITIALIZE_APP,
    CLEAR_CACHED_USER_DATA,
    SET_USER,
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_SINGLE_SETS,
    SET_SELECTED_EXERCISE_ID,
} from './constants';
import {
    IUser,
    IExercise,
    IWorkout,
    ISingleSet,
} from './types';

export type InitializeAppAction = {
    type: 'fitbod/INITIALIZE_APP',
    userId: number,
}

export function initializeApp(userId: number): InitializeAppAction {
    return {
        type: INITIALIZE_APP,
        userId,
    };
}

export function clearCachedUserData() {
    return {
        type: CLEAR_CACHED_USER_DATA,
    };
}

export function setUser(user: IUser | void) {
    return {
        type: SET_USER,
        payload: { user },
    };
}

export function setExercises(exercises: Array<IExercise>) {
    return {
        type: SET_EXERCISES,
        payload: { exercises },
    };
}

export function setWorkouts(workouts: Array<IWorkout>) {
    return {
        type: SET_WORKOUTS,
        payload: { workouts },
    };
}

export function setSingleSets(singleSets: Array<ISingleSet>) {
    return {
        type: SET_SINGLE_SETS,
        payload: { singleSets },
    };
}

export function setSelectedExerciseId(exerciseId: number) {
    return {
        type: SET_SELECTED_EXERCISE_ID,
        payload: { exerciseId },
    };
}
