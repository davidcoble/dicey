import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_BOX
export const addBox = (box) => ({
    type: 'ADD_BOX',
    box
});

export const startAddBox = (boxData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = boxData;
        const box = { description, note, amount, createdAt };
        return database.ref(`users/${uid}/boxes`).push(box).then((ref) => {
            dispatch(addBox({
                id: ref.key,
                ...box
            }));
        });
    };
};

// REMOVE_BOX
export const removeBox = ({ id } = {}) => ({
    type: 'REMOVE_BOX',
    id
});

export const startRemoveBox = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/boxes/${id}`).remove().then(() => {
            dispatch(removeBox({ id }));
        });
    };
};

// EDIT_BOX
export const editBox = (id, updates) => ({
    type: 'EDIT_BOX',
    id,
    updates
});

export const startEditBox = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/boxes/${id}`).update(updates).then(() => {
            dispatch(editBox(id, updates));
        });
    };
};

// SET_BOXES
export const setBoxes = (boxes) => ({
    type: 'SET_BOXES',
    boxes
});

export const startSetBoxes = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/boxes`).once('value').then((snapshot) => {
            const boxes = [];

            snapshot.forEach((childSnapshot) => {
                boxes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setBoxes(boxes));
        });
    };
};
