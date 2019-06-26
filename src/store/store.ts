import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import { rootSaga } from './sagas';

const logger = createLogger({
  collapsed: true,
});

const sagaMiddleware = createSagaMiddleware();

export function initializeStore() {
    const middlewares: Array<Middleware> = [sagaMiddleware];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }
    const store = createStore(
        reducer,
        applyMiddleware(...middlewares),
    );
    sagaMiddleware.run(rootSaga);
    return store;
} 
