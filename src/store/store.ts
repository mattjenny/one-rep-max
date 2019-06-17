import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { reducer } from './reducer';

const logger = createLogger({
  collapsed: true,
});

export function initializeStore() {
    return createStore(
        reducer,
        applyMiddleware(logger)
    );
} 
