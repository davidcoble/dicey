
export const addMsg = ({msg} = {}) => ({
    type: 'ADD_MSG',
    msg
});

export const startAddMsg = ({msg} = {}) => {
    return (dispatch) => {
        dispatch(addMsg({msg}));
    }
};

export const deleteMsg = ({page} = {}) => ({
    type: 'DELETE_MSG',
    page
});

export const startDeleteMsg = ({page} = {}) => {
    return (dispatch) => {
        dispatch(deleteMsg({page}));
    }
};
