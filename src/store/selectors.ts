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

export const selectDateSortedSets = createSelector(
    selectSingleSets,
    (singleSets: Array<ISingleSet>) => {
        const setsCloned = singleSets.slice();
        setsCloned.sort((a: ISingleSet, b: ISingleSet) => b.performedAt.getTime() - a.performedAt.getTime());
        return setsCloned;
    },
)

export const selectExerciseSidebar = createSelector(
    selectExerciseMap,
    selectDateSortedSets,
    (exerciseMap: { [id: number]: IExercise }, sets: Array<ISingleSet>) => {
        const seenExercises = new Set();
        const exercises: Array<IDisplayExercise> = [];
        sets.forEach((set: ISingleSet) => {
            if (!seenExercises.has(set.exerciseId)) {
                seenExercises.add(set.exerciseId);
                const exercise = exerciseMap[set.exerciseId];
                exercises.push({
                    id: set.exerciseId,
                    name: exercise ? exercise.name : '',
                    theoreticalOneRepMax: set.theoreticalOneRepMax,
                });
            }
        });

        return exercises;
    },
)

export const selectSingleSetsByExercise = createSelector(
    selectSingleSets,
    (singleSets: Array<ISingleSet>) => keyBy(singleSets, (set: ISingleSet) => set.exerciseId),
);
