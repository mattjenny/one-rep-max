import { createStore, Store } from 'redux';
import { reducer } from '../reducer';
import {
    setExercises,
    setSingleSets,
    setWorkouts,
    setSelectedExerciseId,
} from '../actions';
import {
    selectExerciseMap,
    selectExerciseSidebar,
    selectWorkoutMap,
    selectSelectedExerciseId,
    selectExerciseInfo,
    selectExerciseData,
} from '../selectors';
import { getOneRepMax } from '../util';
import {
    sets,
    exercises,
    workouts,
} from './testConstants';

describe('selectors for derived state', () => {
    let store: Store<any>;

    beforeAll(() => {
        store = createStore(reducer);
        store.dispatch(setExercises(exercises));
        store.dispatch(setSingleSets(sets));
        store.dispatch(setWorkouts(workouts));
        store.dispatch(setSelectedExerciseId(1));
    })

    it('selects exercise map', () => {
        expect(selectExerciseMap(store.getState())).toMatchObject({
            1: exercises[0],
            2: exercises[1],
            3: exercises[2],
        });
    })

    it('selects workout map', () => {
        expect(selectWorkoutMap(store.getState())).toMatchObject({
            13: workouts[0],
            14: workouts[1],
            15: workouts[2],
        });
    })

    it('selects data for rendering exercise sidebar', () => {
        expect(selectExerciseSidebar(store.getState())).toMatchObject([
            {
                id: 1,
                name: 'Back Squat',
                theoreticalOneRepMax: getOneRepMax(125, 8),
                mostRecentDate: new Date('2019-06-14 4:00'),
            }, {
                id: 3,
                name: 'Deadlift',
                theoreticalOneRepMax: getOneRepMax(180, 3),
                mostRecentDate: new Date('2019-06-14 3:00'),
            }, {
                id: 2,
                name: 'Barbell Bench Press',
                theoreticalOneRepMax: getOneRepMax(160, 6),
                mostRecentDate: new Date('2019-06-07 1:00'),
            },
        ]);
    })

    it('selects selected exercise id', () => {
        expect(selectSelectedExerciseId(store.getState())).toEqual(1);
    })

    it('selects selected exercise info', () => {
        expect(selectExerciseInfo(store.getState())).toMatchObject({
            id: 1,
            name: 'Back Squat',
            theoreticalOneRepMax: getOneRepMax(125, 8),
            mostRecentDate: new Date('2019-06-14 4:00'),
        });
    })

    it('selects selected exercise data', () => {
        expect(selectExerciseData(store.getState())).toMatchObject([
            {
                workoutId: 13,
                date: new Date('2019-06-07 1:00'),
                theoreticalOneRepMax: getOneRepMax(100, 8),
                setCount: 1,
                reps: 8,
                weight: 100,
                setsWithDifferentMax: 0,
            }, {
                workoutId: 14,
                date: new Date('2019-06-10 1:00'),
                theoreticalOneRepMax: getOneRepMax(120, 8),
                setCount: 1,
                reps: 8,
                weight: 120,
                setsWithDifferentMax: 0,
            }, {
                workoutId: 15,
                date: new Date('2019-06-14 3:00'),
                theoreticalOneRepMax: getOneRepMax(125, 8),
                setCount: 1,
                reps: 8,
                weight: 125,
                setsWithDifferentMax: 0,
            },
        ]);
    })
})
