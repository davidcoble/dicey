import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import { boxReducer } from '../reducers/boxes';
import { rollReducer } from '../reducers/rolls';
import { msgReducer } from '../reducers/msgs';
import { gameReducer, gameFilter } from '../reducers/games';
import playersReducer from '../reducers/players';
import { resultReducer } from '../reducers/results';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            boxes: boxReducer,
            gameFilter: gameFilter,
            games: gameReducer,
            msgs: msgReducer,
            results: resultReducer,
            rolls: rollReducer,
            players: playersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
