import { INITIALIZE_APP, SET_USER } from './constants';
import { IUser } from './types';

export function initializeApp() {
    return {
        type: INITIALIZE_APP,
    };
}

export function setUser(user: IUser) {
    return {
        type: SET_USER,
        payload: { user },
    }
}
