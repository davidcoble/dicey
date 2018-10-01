import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import channelReducer from '../reducers/channel';
import chatReducer from '../reducers/chat';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import gamesReducer from '../reducers/games';
import playersReducer from '../reducers/players';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            channel: channelReducer,
            chat: chatReducer,
            expenses: expensesReducer,
            filters: filtersReducer,
            games: gamesReducer,
            players: playersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
