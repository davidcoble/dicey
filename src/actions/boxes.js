import uuid from 'uuid';
import database from '../firebase/firebase';
import {setGames} from "./games";

// ADD_BOX
export const addBox = (box) => ({
    type: 'ADD_BOX',
    box
});

export const startAddBox = (boxData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            description = '',
            sides = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = boxData;
        const box = { name, description, sides, note, amount, createdAt };
        return database.ref(`boxes`).push(box).then((ref) => {
            // console.log("box added");
        });
            // dispatch(addBox({
            //     id: ref.key,
            //     ...box
            // }));
    };
};

// REMOVE_BOX
export const removeBox = ({ id } = {}) => ({
    type: 'REMOVE_BOX',
    id
});

export const startRemoveBox = ({ id } = {}) => {
    return (dispatch, getState) => {
        return database.ref(`boxes/${id}`).remove().then(() => {
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
    return (dispatch) => {
        return database.ref(`boxes/${id}`).update(updates).then(() => {
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
        let boxesRef = database.ref('boxes');
        boxesRef.once('value', (snapshot) => {
            const boxes = [];
            snapshot.forEach((childSnapshot) => {
                boxes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setBoxes(boxes));
        });
        boxesRef.on('value', (snapshot) => {
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
