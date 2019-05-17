// Rolls Reducer

const rollReducerDefaultState = [];

export const rollReducer = (state = rollReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_ROLL':
            return [
                ...state,
                action.roll
            ];
        case 'REMOVE_ROLL':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_ROLL':
            return state.map((roll) => {
                if (roll.id === action.id) {
                    return {
                        ...roll,
                        ...action.updates
                    };
                } else {
                    return roll;
                }
            });
        case 'SET_ROLLS':
            return action.rolls;
        default:
            return state;
    }
};

const rollFilterDefaultState = {
    name: ''
};

export const rollFilter = (state = rollFilterDefaultState, action) => {
    switch (action.type) {
        case 'SET_PLATER':
            return {
                ...state,
                player: action.player
            }
        default:
            return state;
    }

}
