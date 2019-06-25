import keyBy from 'lodash.keyby';
import { createSelector } from 'reselect';
import {
    IState,
    ISingleSet,
    IExercise,
    IDisplayExercise,
    IWorkoutExercise,
    IWorkout,
} from './types';
import { sets } from './tests/testConstants';

const selectSingleSets = (state: IState) => state.singleSets;

const selectExercises = (state: IState) => state.exercises;

const selectWorkouts = (state: IState) => state.workouts;

export const selectExerciseMap = createSelector<IState, Array<IExercise>, { [id: number]: IExercise }>(
    selectExercises,
    (exercises) => keyBy(exercises, (exercise: IExercise) => exercise.id),
);

export const selectWorkoutMap = createSelector<IState, Array<IWorkout>, { [id: number]: IWorkout }>(
    selectWorkouts,
    (workouts) => keyBy(workouts, (workout: IWorkout) => workout.id),
);

export const selectExerciseSidebar = createSelector(
    selectExerciseMap,
    selectSingleSets,
    (exerciseMap: { [id: number]: IExercise }, sets: Array<ISingleSet>) => {
        const exerciseMaxes: { [id: number]: { max: number, mostRecentDate: Date } } = {};
        sets.forEach((set: ISingleSet) => {
            if (!exerciseMaxes[set.exerciseId]) {
                exerciseMaxes[set.exerciseId] = {
                    max: set.theoreticalOneRepMax,
                    mostRecentDate: set.performedAt,
                };
            } else {
                if (set.theoreticalOneRepMax > exerciseMaxes[set.exerciseId].max) {
                    exerciseMaxes[set.exerciseId].max = set.theoreticalOneRepMax;
                }
                if (set.performedAt.getTime() > exerciseMaxes[set.exerciseId].mostRecentDate.getTime()) {
                    exerciseMaxes[set.exerciseId].mostRecentDate = set.performedAt;
                }
            }
        });

        const exercises: Array<IDisplayExercise> = [];
        Object.keys(exerciseMaxes).forEach((exerciseIdStr: string) => {
            const exerciseId: number = Number.parseInt(exerciseIdStr, 10);
            const exercise = exerciseMap[exerciseId];
                exercises.push({
                    id: exerciseId,
                    name: exercise ? exercise.name : '',
                    theoreticalOneRepMax: exerciseMaxes[exerciseId].max,
                    mostRecentDate: exerciseMaxes[exerciseId].mostRecentDate,
                });
        })

        exercises.sort((a: IDisplayExercise, b: IDisplayExercise) => b.mostRecentDate.getTime() - a.mostRecentDate.getTime());
        return exercises;
    },
)

export const selectDisplayExercisesById = createSelector(
    selectExerciseSidebar,
    (exercises: Array<IDisplayExercise>) => keyBy(exercises, (exercise: IDisplayExercise) => exercise.id),
)

export const selectSelectedExerciseId = createSelector(
    selectExerciseSidebar,
    (state: IState) => state.selectedExerciseId,
    (exercises, selectedExerciseId) => {
        if (selectedExerciseId != null) {
            return selectedExerciseId;
        } else if (exercises.length > 0) {
            return exercises[0].id;
        }
        return undefined;
    },
)

export const selectExerciseInfo = createSelector(
    selectSelectedExerciseId,
    selectDisplayExercisesById,
    (exerciseId, displayExerciseMap) => {
        return exerciseId && displayExerciseMap[exerciseId]
            ? displayExerciseMap[exerciseId]
            : {
                id: 0,
                name: 'Select an exercise to view details.',
                theoreticalOneRepMax: 0,
                mostRecentDate: new Date(0),
            };
    }
)

function setsToDataPoint(workoutId: number, date: Date, sets: Array<ISingleSet>): IWorkoutExercise {
    const data: IWorkoutExercise = {
        workoutId,
        date,
        theoreticalOneRepMax: 0,
        setCount: 0,
        reps: 0,
        weight: 0,
        setsWithDifferentMax: 0,
    }
    sets.forEach((set: ISingleSet) => {
        if (set.theoreticalOneRepMax > data.theoreticalOneRepMax) {
            data.theoreticalOneRepMax = set.theoreticalOneRepMax;
            data.weight = set.weight;
            data.reps = set.reps;
            data.setsWithDifferentMax = data.setsWithDifferentMax + data.setCount;
            data.setCount = 1;
        } else if (set.theoreticalOneRepMax === data.theoreticalOneRepMax) {
            data.setCount = data.setCount + 1;
        } else {
            data.setsWithDifferentMax = data.setsWithDifferentMax + 1;
        }
    });

    return data;
}

export const selectExerciseData = createSelector(
    selectSelectedExerciseId,
    selectSingleSets,
    selectWorkoutMap,
    (exerciseId, singleSets, workoutMap) => {
        const setsByWorkout: { [workoutId: number]: Array<ISingleSet> } = {};
        singleSets.filter((set: ISingleSet) => set.exerciseId === exerciseId && workoutMap[set.workoutId])
            .forEach((set: ISingleSet) => {
                if (!setsByWorkout[set.workoutId]) {
                    setsByWorkout[set.workoutId] = [];
                }
                setsByWorkout[set.workoutId].push(set);
            });
        const data: Array<IWorkoutExercise> = [];
        Object.keys(setsByWorkout).forEach((workoutIdStr: string) => {
            const workoutId = parseInt(workoutIdStr, 10);
            const workout = workoutMap[workoutId] || { workoutDate: new Date(0) };
            const sets: Array<ISingleSet> = setsByWorkout[workoutId] || [];
            data.push(setsToDataPoint(workoutId, workout.workoutDate, sets));
        });

        data.sort((a: IWorkoutExercise, b: IWorkoutExercise) => a.date.getTime() - b.date.getTime())
        return data;
    }
)

export const selectSingleSetsByExercise = createSelector(
    selectSingleSets,
    (singleSets: Array<ISingleSet>) => keyBy(singleSets, (set: ISingleSet) => set.exerciseId),
);
