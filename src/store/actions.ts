import { INITIALIZE_APP } from './constants';

export function initializeApp() {
    return {
        type: INITIALIZE_APP,
    };
}