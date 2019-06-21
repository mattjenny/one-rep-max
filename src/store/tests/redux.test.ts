import { createStore, Store } from 'redux';
import { reducer } from '../reducer';
import {
    setUser,
    setExercises,
    setWorkouts,
    setSingleSets,
} from '../actions';
import {
    user1,
    exercises,
    sets,
    workouts,
} from './testConstants';

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
        store.dispatch(setExercises(exercises));
        expect(store.getState()).toMatchObject({
            exercises,
            workouts: [],
            singleSets: [],
        });
    })

    it('can set workouts', () => {
        store.dispatch(setWorkouts(workouts));
        expect(store.getState()).toMatchObject({
            exercises: [],
            workouts,
            singleSets: [],
        });
    })

    it('can set single sets', () => {
        store.dispatch(setSingleSets(sets));
        expect(store.getState()).toMatchObject({
            exercises: [],
            workouts: [],
            singleSets: sets,
        });
    })
})
