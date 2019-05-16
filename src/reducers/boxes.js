// Boxes Reducer

const boxReducerDefaultState = [];

export const boxReducer = (state = boxReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_BOX':
            return [
                ...state,
                action.box
            ];
        case 'REMOVE_BOX':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_BOX':
            return state.map((box) => {
                if (box.id === action.id) {
                    return {
                        ...box,
                        ...action.updates
                    };
                } else {
                    return box;
                }
            });
        case 'SET_BOXES':
            return action.boxes;
        default:
            return state;
    }
};

const boxFilterDefaultState = {
    name: ''
};

