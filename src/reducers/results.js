// Results Reducer

const resultReducerDefaultState = [];

export const resultReducer = (state = resultReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_RESULT':
            return [
                ...state,
                action.result
            ];
        case 'REMOVE_RESULT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_RESULT':
            return state.map((result) => {
                if (result.id === action.id) {
                    return {
                        ...result,
                        ...action.updates
                    };
                } else {
                    return result;
                }
            });
        case 'SET_RESULTS':
            return action.results;
        default:
            return state;
    }
};

const resultFilterDefaultState = {
    name: ''
};

