// Units Reducer

const unitReducerDefaultState = [];

export const unitReducer = (state = unitReducerDefaultState, action) => {
    console.log("unitReducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_UNIT':
            return [
                ...state,
                action.unit
            ];
        case 'REMOVE_UNIT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_UNIT':
            return state.map((unit) => {
                if (unit.id === action.id) {
                    return {
                        ...unit,
                        ...action.updates
                    };
                } else {
                    return unit;
                }
            });
        case 'EDIT_UNIT_EPILOGUE':
            return state.map((unit) => {
                if (unit.id === action.id) {
                    epilogue = action.epilogue;
                    return {
                        ...unit,
                        epilogue
                    };
                } else {
                    return unit;
                }
            });
        case 'SET_UNITS':
            return action.units;
        default:
            return state;
    }
};
