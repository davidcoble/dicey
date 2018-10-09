import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import { channelReducer, channelFilter } from '../reducers/channel';
import { chatReducer, chatFilter } from '../reducers/chat';
import expensesReducer from '../reducers/expenses';
// import filtersReducer from '../reducers/filters';
import gamesReducer from '../reducers/games';
import playersReducer from '../reducers/players';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            channels: channelReducer,
            channelFilter: channelFilter,
            chats: chatReducer,
            chatFilter: chatFilter,
            expenses: expensesReducer,
            games: gamesReducer,
            players: playersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
