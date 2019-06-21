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

const exercise1 = {
    id: 1,
    name: "Back Squat",
};

const exercise2 = {
    id: 2,
    name: "Barbell Bench Press",
};

const exercise3 = {
    id: 3,
    name: "Deadlift",
};

const exercises = [ exercise1, exercise2, exercise3 ];

// Note: theoretical one rep max numbers not accurate for tests
const set1 = {
    exerciseId: 2,
    id: 1,
    performedAt: new Date('2019-06-07 1:00'),
    reps: 6,
    weight: 160,
    workoutId: 13,
    theoreticalOneRepMax: 182,
};

const set2 = {
    exerciseId: 1,
    id: 2,
    performedAt: new Date('2019-06-07 2:00'),
    reps: 8,
    weight: 100,
    workoutId: 13,
    theoreticalOneRepMax: 125,
};

const set3 = {
    exerciseId: 1,
    id: 3,
    performedAt: new Date('2019-06-10 1:00'),
    reps: 8,
    weight: 120,
    workoutId: 14,
    theoreticalOneRepMax: 145,
};

const set4 = {
    exerciseId: 3,
    id: 4,
    performedAt: new Date('2019-06-10 2:00'),
    reps: 3,
    weight: 180,
    workoutId: 14,
    theoreticalOneRepMax: 190,
};

const set5 = {
    exerciseId: 3,
    id: 5,
    performedAt: new Date('2019-06-14 3:00'),
    reps: 3,
    weight: 170,
    workoutId: 15,
    theoreticalOneRepMax: 180,
};

const set6 = {
    exerciseId: 1,
    id: 6,
    performedAt: new Date('2019-06-14 4:00'),
    reps: 8,
    weight: 125,
    workoutId: 15,
    theoreticalOneRepMax: 145,
};

// Random order
const sets = [ set2, set5, set4, set1, set6, set3 ];

describe('selectors for derived state', () => {
    let store: Store<any>;

    beforeAll(() => {
        store = createStore(reducer);
        store.dispatch(setExercises(exercises));
        store.dispatch(setSingleSets(sets));
    })

    it('selects exercise map', () => {
        expect(selectExerciseMap(store.getState())).toMatchObject({
            1: exercise1,
            2: exercise2,
            3: exercise3,
        });
    })

    it('selects reverse date-sorted list of sets', () => {
        expect(selectDateSortedSets(store.getState())).toMatchObject([
            set6, set5, set4, set3, set2, set1,
        ]);
    })

    it('selects data for rendering exercise sidebar', () => {
        expect(selectExerciseSidebar(store.getState())).toMatchObject([
            {
                id: 1,
                name: 'Back Squat',
                theoreticalOneRepMax: 145,
            }, {
                id: 3,
                name: 'Deadlift',
                theoreticalOneRepMax: 180,
            }, {
                id: 2,
                name: 'Barbell Bench Press',
                theoreticalOneRepMax: 182,
            },
        ]);
    })
})
