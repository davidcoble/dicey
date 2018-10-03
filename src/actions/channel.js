import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_CHANNEL
export const addChannel = (channel) => ({
    type: 'ADD_CHANNEL',
    channel
});

export const startAddChannel = (channelData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            name = '',
            createdAt = 0,
            createdBy = ''
        } = channelData;
        const channel = { description, name, createdAt, createdBy };
        return database.ref('channels').push(channel)
            .then((ref) => {
            // console.log("startAddChanel, ref = " + JSON.stringify(ref, null, 4));
            // dispatch(addChannel({
            //     id: ref.key,
            //     ...channel
            // }));
        });
    };
};

// REMOVE_CHANNEL
export const removeChannel = ({ id } = {}) => ({
    type: 'REMOVE_CHANNEL',
    id
});

export const startRemoveChannel = ({ id } = {}) => {
    return (dispatch, getState) => {
        return database.ref(`channels/${id}`).remove().then(() => {
            dispatch(removeChannel({ id }));
        });
    };
};

// EDIT_CHANNEL
export const editChannel = (id, updates) => ({
    type: 'EDIT_CHANNEL',
    id,
    updates
});

export const startEditChannel = (id, updates) => {
    console.log("startEditChannel updates = " + JSON.stringify(updates, null, 4));
    return (dispatch, getState) => {
        return database.ref(`channels/${id}`).update(updates).then(() => {
            dispatch(editChannel(id, updates));
        });
    };
};

// SET_CHANNELS
export const setChannel = (channels) => ({
    type: 'SET_CHANNELS',
    channels
});

export const startSetChannel = () => {
    // console.log("startSetChannel");
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let channelsRef = database.ref('channels');
        channelsRef.once('value', (snapshot) => {
            const channels = [];
            snapshot.forEach((childSnapshot) => {
                channels.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // console.log("startSetChannel dispatch setChannel channels = " + JSON.stringify(channels));
            dispatch(setChannel(channels));
        });
        channelsRef.on('value', (snapshot) => {
            const channels = [];
            snapshot.forEach((childSnapshot) => {
                channels.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setChannel(channels));
        });
    };
};
