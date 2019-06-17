import { takeEvery } from 'redux-saga/effects';
import { INITIALIZE_APP } from './constants';
import { loadUsers } from '../network/client';

function* initialize(): IterableIterator<void> {
    console.log('loading users...');
    loadUsers();
}

export function* rootSaga(): IterableIterator<any> {
    yield takeEvery(INITIALIZE_APP, initialize);
}
