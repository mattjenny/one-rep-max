import { SET_USER } from './constants';
import { IState } from './types';

export const reducer = (prevState: IState = {}, action: any) => {
    switch (action.type) {
        case SET_USER:
            return { ...prevState, user: action.payload.user };
        default:
            return prevState;
    }
}
