import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import { rootSaga } from './sagas';

const logger = createLogger({
  collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

export function initializeStore() {
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware, logger),
    );
    sagaMiddleware.run(rootSaga);
    return store;
} 
