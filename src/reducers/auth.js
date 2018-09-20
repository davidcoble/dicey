export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                name: action.name
            };
        case 'LOGOUT':
            console.log("LOGOUT really called!");
            return {};
        default:
            return state;
    }
};
