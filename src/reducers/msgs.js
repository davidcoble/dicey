// Messages Reducer

const msgReducerDefaultState = [];

export const msgReducer = (state = msgReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_MSG':
            return [
                ...state,
                action.msg
            ];
        case 'DELETE_MSG':
            return state.filter(({ page }) => page !== action.page);
        default:
            return state;
    }
};

const msgFilterDefaultState = {
    page: ''
};

export const msgFilter = (state = msgFilterDefaultState, action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page
            }
        default:
            return state;
    }

}
