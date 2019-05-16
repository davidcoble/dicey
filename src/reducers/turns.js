// Turns Reducer

const turnReducerDefaultState = [];

export const turnReducer = (state = turnReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_TURN':
            return [
                ...state,
                action.turn
            ];
        case 'REMOVE_TURN':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_TURN':
            return state.map((turn) => {
                if (turn.id === action.id) {
                    return {
                        ...turn,
                        ...action.updates
                    };
                } else {
                    return turn;
                }
            });
        case 'SET_TURNS':
            return action.turns;
        default:
            return state;
    }
};

const turnFilterDefaultState = {
    name: ''
};

