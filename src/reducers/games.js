// Games Reducer

const gamesReducerDefaultState = [];

export default (state = gamesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_GAME':
            return [
                ...state,
                action.game
            ];
        case 'REMOVE_GAME':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_GAME':
            return state.map((game) => {
                if (game.id === action.id) {
                    return {
                        ...game,
                        ...action.updates
                    };
                } else {
                    return game;
                }
            });
        case 'SET_GAMES':
            return action.games;
        default:
            return state;
    }
};
