const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                pid: action.pid,
                uid: action.uid,
                name: action.name,
                email: action.email,
                photoURL: action.photoURL,
                isAdmin: action.isAdmin
            };
        case 'UPDATE_LOGIN':
            console.log("action = " + JSON.stringify(action))
            const update = {
                ...state,
                ...action,
            }
            return update;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};
