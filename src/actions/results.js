import uuid from 'uuid';
import database from '../firebase/firebase';
import {setGames} from "./games";

// ADD_RESULT
export const addResult = (result) => ({
    type: 'ADD_RESULT',
    result
});

export const startAddResult = (resultData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            description = '',
            sides = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = resultData;
        const result = { name, description, sides, note, amount, createdAt };
        return database.ref(`resultes`).push(result).then((ref) => {
            // console.log("result added");
        });
            // dispatch(addResult({
            //     id: ref.key,
            //     ...result
            // }));
    };
};

// REMOVE_RESULT
export const removeResult = ({ id } = {}) => ({
    type: 'REMOVE_RESULT',
    id
});

export const startRemoveResult = ({ id } = {}) => {
    return (dispatch, getState) => {
        return database.ref(`resultes/${id}`).remove().then(() => {
            dispatch(removeResult({ id }));
        });
    };
};

// EDIT_RESULT
export const editResult = (id, updates) => ({
    type: 'EDIT_RESULT',
    id,
    updates
});

export const startEditResult = (id, updates) => {
    return (dispatch) => {
        return database.ref(`resultes/${id}`).update(updates).then(() => {
            dispatch(editResult(id, updates));
        });
    };
};

// SET_RESULTES
export const setResultes = (resultes) => ({
    type: 'SET_RESULTES',
    resultes
});

export const startSetResultes = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let resultesRef = database.ref('resultes');
        resultesRef.once('value', (snapshot) => {
            const resultes = [];
            snapshot.forEach((childSnapshot) => {
                resultes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setResultes(resultes));
        });
        resultesRef.on('value', (snapshot) => {
            const resultes = [];
            snapshot.forEach((childSnapshot) => {
                resultes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setResultes(resultes));
        });
    };
};
