import {
    all,
    call,
    put,
} from 'redux-saga/effects';
import {
    setUser,
    setExercises,
    setWorkouts,
    setSingleSets,
    setLoading,
} from '../actions';
import {
    clearCachedUserData,
    loadExercises,
    loadWorkouts,
} from '../sagas';
import { NetworkClient } from '../../network/client';
import {
    exercises,
    exercisesRaw,
    workouts,
    workoutsRaw,
    sets,
    setsRaw,
} from './testConstants';

describe('saga tests', () => {
    it('clearCachedUserData does in fact clear cached data', () => {
        const generator = clearCachedUserData();
        expect(generator.next().value).toEqual(put(setWorkouts([])));
        expect(generator.next().value).toEqual(put(setExercises([])));
        expect(generator.next().value).toEqual(put(setSingleSets([])));
        expect(generator.next().value).toEqual(put(setUser(undefined)));
        expect(generator.next().done).toBe(true);
    })

    it('loads exercises', () => {
        const generator = loadExercises();
        expect(generator.next().value).toEqual(call(NetworkClient.getExercises));
        expect(generator.next(exercisesRaw).value).toEqual(put(setExercises(exercises)))
        expect(generator.next().done).toBe(true);
    })

    it('loads workouts', () => {
        const generator = loadWorkouts({ userId: 1 });

        // Load workouts
        expect(generator.next(workoutsRaw).value).toEqual(put(setLoading(true)));
        expect(generator.next().value).toEqual(call(NetworkClient.getUserWorkouts, 1));
        expect(generator.next(workoutsRaw).value).toEqual(put(setWorkouts(workouts)));

        // Load sets
        expect(generator.next().value).toEqual(all([
            call(NetworkClient.getUserWorkoutSingleSets, 1, 13),
            call(NetworkClient.getUserWorkoutSingleSets, 1, 14),
            call(NetworkClient.getUserWorkoutSingleSets, 1, 15),
        ]));
        expect(generator.next(setsRaw).value).toEqual(put(setSingleSets(sets)));
        expect(generator.next(workoutsRaw).value).toEqual(put(setLoading(false)));

        expect(generator.next().done).toBe(true);
    })
})