import {
    SET_USER,
    SET_EXERCISES,
    SET_WORKOUTS,
    SET_SINGLE_SETS,
} from './constants';
import { IState } from './types';

const initialState: IState = {
    exercises: [],
    workouts: [],
    singleSets: [],
};

export const reducer = (prevState: IState = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return { ...prevState, user: action.payload.user };
        case SET_EXERCISES:
            return { ...prevState, exercises: action.payload.exercises };
        case SET_WORKOUTS:
            return { ...prevState, workouts: action.payload.workouts };
        case SET_SINGLE_SETS:
            return { ...prevState, singleSets: action.payload.singleSets };
        default:
            return prevState;
    }
}