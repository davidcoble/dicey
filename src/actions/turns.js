import uuid from 'uuid';
import database from '../firebase/firebase';
import {setGames} from "./games";

// ADD_TURN
export const addTurn = (turn) => ({
    type: 'ADD_TURN',
    turn
});

export const startAddTurn = (turnData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = turnData;
        const turn = { name, description, note, amount, createdAt };
        return database.ref(`turns`).push(turn).then((ref) => {
            console.log("turn added");
        });
            // dispatch(addTurn({
            //     id: ref.key,
            //     ...turn
            // }));
    };
};

// REMOVE_TURN
export const removeTurn = ({ id } = {}) => ({
    type: 'REMOVE_TURN',
    id
});

export const startRemoveTurn = ({ id } = {}) => {
    return (dispatch, getState) => {
        return database.ref(`turns/${id}`).remove().then(() => {
            dispatch(removeTurn({ id }));
        });
    };
};

// EDIT_TURN
export const editTurn = (id, updates) => ({
    type: 'EDIT_TURN',
    id,
    updates
});

export const startEditTurn = (id, updates) => {
    console.log("id = " + JSON.stringify(id));
    console.log("updates = " + JSON.stringify(updates));
    return (dispatch) => {
        return database.ref(`turns/${id}`).update(updates).then(() => {
            dispatch(editTurn(id, updates));
        });
    };
};

// SET_TURNS
export const setTurns = (turns) => ({
    type: 'SET_TURNS',
    turns
});

export const startSetTurns = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let turnsRef = database.ref('turns');
        turnsRef.once('value', (snapshot) => {
            const turns = [];
            snapshot.forEach((childSnapshot) => {
                turns.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setTurns(turns));
        });
        turnsRef.on('value', (snapshot) => {
            const turns = [];
            snapshot.forEach((childSnapshot) => {
                turns.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setTurns(turns));
        });
    };
};
