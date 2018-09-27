const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
    //console.log("In Auth Reducer, action =" + JSON.stringify(action, null, 4));
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                name: action.name,
                email: action.email,
                photoURL: action.photoURL,
                isAdmin: action.isAdmin
            };
        case 'LOGOUT':
            console.log("LOGOUT really called!");
            return {};
        default:
            return state;
    }
};
