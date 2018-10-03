import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_CHAT
export const addChat = (chat) => ({
    type: 'ADD_CHAT',
    chat
});

export const startAddChat = (chatData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            name = '',
            createdAt = 0,
            createdBy = ''
        } = chatData;
        const chat = { description, name, createdAt, createdBy };
        return database.ref(`chats`).push(chat).then((ref) => {
            console.log("startAddChat, ref = " + JSON.stringify(ref, null, 4));
        });
    };
};

// REMOVE_CHAT
export const removeChat = ({ id } = {}) => ({
    type: 'REMOVE_CHAT',
    id
});

export const startRemoveChat = ({ id } = {}) => {
    return (dispatch, getState) => {
        //const uid = getState().auth.uid;
        return database.ref(`chats/${id}`).remove().then(() => {
            dispatch(removeChat({ id }));
        });
    };
};

// EDIT_CHAT
export const editChat = (id, updates) => ({
    type: 'EDIT_CHAT',
    id,
    updates
});

export const startEditChat = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`chats/${id}`).update(updates).then(() => {
            dispatch(editChat(id, updates));
        });
    };
};

// SET_CHATS
export const setChat = (chats) => ({
    type: 'SET_CHATS',
    chats
});

export const startSetChat = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let chatsRef = database.ref('chats');
        chatsRef.once('value', (snapshot) => {
            const chats = [];
            snapshot.forEach((childSnapshot) => {
                chats.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setChat(chats));
        });
        chatsRef.on('value', (snapshot) => {
            const chats = [];
            snapshot.forEach((childSnapshot) => {
                chats.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setChat(chats));
        });
    };
};
