// Chats Reducer

const chatsReducerDefaultState = [];

export default (state = chatsReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_CHAT':
            return [
                ...state,
                action.chat
            ];
        case 'REMOVE_CHAT':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_CHAT':
            return state.map((chat) => {
                if (chat.id === action.id) {
                    return {
                        ...chat,
                        ...action.updates
                    };
                } else {
                    return chat;
                }
            });
        case 'SET_CHATS':
            return action.chats;
        default:
            return state;
    }
};
