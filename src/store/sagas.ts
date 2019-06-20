import { call, takeEvery, put } from 'redux-saga/effects';
import { INITIALIZE_APP } from './constants';
import { AuthManager } from '../auth/AuthManager';
import { loadUsers } from '../network/client';
import { setUser } from './actions';
import { IUser } from './types';

function* initialize(): IterableIterator<void> {
    try {
        // If user is already authenticated, load the user
        if (AuthManager.isAuthenticated()) {
            const authInfo = AuthManager.getAuthDetails();
            const username = authInfo && authInfo.username;

            const users = yield call(loadUsers) as any;
            const currentUser = users.find((user: IUser) => user.email === username);
            yield put(setUser(currentUser)) as any;
        }
    } catch (e) {
        // TODO error state
        console.error('Error!');
    }
}

export function* rootSaga(): IterableIterator<any> {
    yield takeEvery(INITIALIZE_APP, initialize);
}
