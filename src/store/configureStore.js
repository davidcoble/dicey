import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import { boxReducer } from '../reducers/boxes';
import expensesReducer from '../reducers/expenses';
// import filtersReducer from '../reducers/filters';
import { gameReducer, gameFilter } from '../reducers/games';
import playersReducer from '../reducers/players';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            boxes: boxReducer,
            gameFilter: gameFilter,
            expenses: expensesReducer,
            games: gameReducer,
            players: playersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
