import {
    all,
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects';
import { INITIALIZE_APP, CLEAR_CACHED_USER_DATA } from './constants';
import { NetworkClient } from '../network/client';
import {
    InitializeAppAction,
    setUser,
    setExercises,
    setWorkouts,
    setSingleSets,
} from './actions';
import { IWorkout } from './types';
import {
    toExercise,
    toWorkout,
    toSingleSet,
} from './util';
import { ISingleSetRaw } from '../network/types';

function* initialize(action: InitializeAppAction): IterableIterator<any> {
    try {
        yield fork(loadExercises);
        yield fork(loadWorkouts, { userId: action.userId });
    } catch (e) {
        // TODO error state
        console.error(e);
    }
}

export function* clearCachedUserData(): IterableIterator<any> {
    yield put(setWorkouts([]));
    yield put(setExercises([]));
    yield put(setSingleSets([]));
    yield put(setUser(undefined));
}

export function* loadExercises(): IterableIterator<any> {
    try {
        const exercises = yield call(NetworkClient.getExercises);
        yield put(setExercises(exercises.map(toExercise)));
    } catch (e) {
        // TODO retries/ error state
        console.error(e);
    }
}

export function* loadWorkouts(action: { userId: number }): IterableIterator<any> {
    try {
        const workoutsRaw = yield call(NetworkClient.getUserWorkouts, action.userId);
        const workouts = workoutsRaw.map(toWorkout);
        yield put(setWorkouts(workouts));

        const workoutRequests = workouts.map((workout: IWorkout) => call(NetworkClient.getUserWorkoutSingleSets, action.userId, workout.id));
        const singleSets: Array<Array<ISingleSetRaw>> = yield all(workoutRequests);
        yield put(setSingleSets(singleSets.flatMap((workoutSets: Array<ISingleSetRaw>) => workoutSets.map(toSingleSet))));
    } catch (e) {
        // TODO retries/ error state
        console.error(e);
    }
}

export function* rootSaga(): IterableIterator<any> {
    yield takeEvery(INITIALIZE_APP, initialize);
    yield takeEvery(CLEAR_CACHED_USER_DATA, clearCachedUserData);
}
