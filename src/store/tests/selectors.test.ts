import { createStore, Store } from 'redux';
import { reducer } from '../reducer';
import {
    setExercises,
    setSingleSets,
} from '../actions';
import {
    selectExerciseMap,
    selectDateSortedSets,
    selectExerciseSidebar,
} from '../selectors';
import { getOneRepMax } from '../util';
import {
    sets,
    exercises,
} from './testConstants';

const setsReverseOrdered = [ sets[5], sets[4], sets[0], sets[1], sets[2], sets[3] ];

describe('selectors for derived state', () => {
    let store: Store<any>;

    beforeAll(() => {
        store = createStore(reducer);
        store.dispatch(setExercises(exercises));
        store.dispatch(setSingleSets(sets));
    })

    it('selects exercise map', () => {
        expect(selectExerciseMap(store.getState())).toMatchObject({
            1: exercises[0],
            2: exercises[1],
            3: exercises[2],
        });
    })

    it('selects reverse date-sorted list of sets', () => {
        expect(selectDateSortedSets(store.getState())).toMatchObject(setsReverseOrdered);
    })

    it('selects data for rendering exercise sidebar', () => {
        expect(selectExerciseSidebar(store.getState())).toMatchObject([
            {
                id: 1,
                name: 'Back Squat',
                theoreticalOneRepMax: getOneRepMax(125, 8),
            }, {
                id: 3,
                name: 'Deadlift',
                theoreticalOneRepMax: getOneRepMax(170, 3),
            }, {
                id: 2,
                name: 'Barbell Bench Press',
                theoreticalOneRepMax: getOneRepMax(160, 6),
            },
        ]);
    })
})
