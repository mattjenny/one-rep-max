import { createStore, Store } from 'redux';
import { reducer } from '../reducer';
import {
    setUser,
    setExercises,
    setWorkouts,
    setSingleSets,
} from '../actions';

const user1 = {
    email: 'test@example.com',
    id: 42,
};

const exercise1 = {
    id: 1,
    name: 'Jumping jacks',
}

const exercise2 = {
    id: 2,
    name: 'Bench press',
}

const now = new Date();

const workout1 = {
    id: 13,
    userId: 42,
    workoutDate: now,
    workoutDuration: 3600,
}

const set1 = {
    exerciseId: 2,
    id: 36,
    performedAt: now,
    reps: 7,
    weight: 170,
    workoutId: 13,
    theoreticalOneRepMax: 204,
}

describe('Redux store actions and reducer', () => {
    let store: Store<any>;

    beforeEach(() => {
        store = createStore(reducer);
    })

    it('has expected initial state', () => {
        expect(store.getState()).toMatchObject({
            exercises: [],
            workouts: [],
            singleSets: [],
        });
    })

    it('can set user', () => {
        store.dispatch(setUser(user1));
        expect(store.getState()).toMatchObject({
            exercises: [],
            workouts: [],
            singleSets: [],
            user: user1,
        });
    })

    it('can set exercises', () => {
        store.dispatch(setExercises([ exercise1, exercise2 ]));
        expect(store.getState()).toMatchObject({
            exercises: [ exercise1, exercise2 ],
            workouts: [],
            singleSets: [],
        });
    })

    it('can set workouts', () => {
        store.dispatch(setWorkouts([ workout1 ]));
        expect(store.getState()).toMatchObject({
            exercises: [],
            workouts: [ workout1 ],
            singleSets: [],
        });
    })

    it('can set single sets', () => {
        store.dispatch(setSingleSets([ set1 ]));
        expect(store.getState()).toMatchObject({
            exercises: [],
            workouts: [],
            singleSets: [ set1 ],
        });
    })
})
