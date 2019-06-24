import keyBy from 'lodash.keyby';
import { createSelector } from 'reselect';
import {
    IState,
    ISingleSet,
    IExercise,
    IDisplayExercise,
} from './types';

const selectSingleSets = (state: IState) => state.singleSets;

const selectExercises = (state: IState) => state.exercises;

export const selectExerciseMap = createSelector<IState, Array<IExercise>, { [id: number]: IExercise }>(
    selectExercises,
    (exercises) => keyBy(exercises, (exercise: IExercise) => exercise.id),
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

export const selectSingleSetsByExercise = createSelector(
    selectSingleSets,
    (singleSets: Array<ISingleSet>) => keyBy(singleSets, (set: ISingleSet) => set.exerciseId),
);
