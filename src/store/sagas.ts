import {
    all,
    call,
    fork,
    put,
    select,
    takeEvery,
} from 'redux-saga/effects';
import { INITIALIZE_APP } from './constants';
import { AuthManager } from '../auth/AuthManager';
import { NetworkClient } from '../network/client';
import {
    setExercises,
    setWorkouts,
    setSingleSets,
} from './actions';
import {
    IState,
    IWorkout,
} from './types';

import {
    toExercise,
    toWorkout,
    toSingleSet,
} from './util';

function* initialize(): IterableIterator<any> {
    try {
        // If user is already authenticated, load the user
        if (AuthManager.isAuthenticated()) {
            const userId = yield select((state: IState) => state.user && state.user.id)

            yield fork(loadExercises);
            yield fork(loadWorkouts, { userId });
        }
    } catch (e) {
        // TODO error state
        console.error(e);
    }
}

function* loadExercises(): IterableIterator<any> {
    try {
        const exercises = yield call(NetworkClient.getExercises);
        yield put(setExercises(exercises.map(toExercise)));
    } catch (e) {
        // TODO retries/ error state
        console.error(e);
    }
}

function* loadWorkouts(action: { userId: number }): IterableIterator<any> {
    try {
        const workoutsRaw = yield call(NetworkClient.getUserWorkouts, action.userId);
        const workouts = workoutsRaw.map(toWorkout);
        yield put(setWorkouts(workouts));

        const workoutRequests = workouts.map((workout: IWorkout) => call(NetworkClient.getUserWorkoutSingleSets, action.userId, workout.id));
        const singleSets = yield all(workoutRequests);
        yield put(setSingleSets(singleSets.map(toSingleSet)));
    } catch (e) {
        // TODO retries/ error state
        console.error(e);
    }
}

export function* rootSaga(): IterableIterator<any> {
    yield takeEvery(INITIALIZE_APP, initialize);
}
