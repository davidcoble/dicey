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
            return state;
        case 'UNDELETE_GAME':
            return state;
        case 'EDIT_GAME':
            return state.map((game) => {
                if (game.id === action.id) {
                    return {
                        ...game,
                        ...action.updates,
                    };
                } else {
                    return game;
                }
            });
        case 'SET_GAMES':
            return action.games;
        case 'SET_GAME_TOKEN_POSITION':
            // console.log("SET_GAME_TOKEN_POSITION action = " + JSON.stringify(action, null, 2));
            return state.map((game) => {
                if (game.id === action.gid) {
                    game.units[action.id] = {
                      id: action.id,
                      imageName: action.imageName,
                      name: action.name,
                      theater: action.theater,
                      x: action.x,
                      y: action.y,  
                    }
                    return {
                        ...game,
                        
                    };
                } else {
                    return game;
                }
            });
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
