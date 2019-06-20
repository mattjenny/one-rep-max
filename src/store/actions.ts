import { 
    INITIALIZE_APP,
    SET_USER,
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_SINGLE_SETS,
} from './constants';
import {
    IUser,
    IExercise,
    IWorkout,
    ISingleSet,
} from './types';

export function initializeApp() {
    return {
        type: INITIALIZE_APP,
    };
}

export function setUser(user: IUser) {
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
