// Games Reducer

const gameReducerDefaultState = [];

export const gameReducer = (state = gameReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
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

const gameFilterDefaultState = {
    name: ''
};

export const gameFilter = (state = gameFilterDefaultState, action) => {
    switch (action.type) {
        case 'SET_PLAYER':
            return {
                ...state,
                player: action.player
            }
        default:
            return state;
    }

}
