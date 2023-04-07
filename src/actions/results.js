import uuid from 'uuid';
import database from '../firebase/firebase';
import { setGames } from "./games";
import { history } from "../routers/AppRouter";
// ADD_RESULT
export const addResult = (result) => ({
    type: 'ADD_RESULT',
    result
});

export const startAddResult = (resultData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            rollType = '',
            dice = 0,
            sides = 0,
            createdAt = 0,
            outcomes = [],
            boxes = {},
        } = resultData;
        for (let x = dice; x <= dice * sides; x++) {
            outcomes[x - dice] = {
                rolled: x,
                result: "your rolled " + x
            }
        }
        const result = { rollType, dice, sides, createdAt, outcomes, boxes };
        // console.log("about to add result to database: "+JSON.stringify(result,null,2));
        return database.ref(`results`).push(result).then((ref) => {
            console.log("result added ref = " + ref);
            let refstring = String(ref);
            let offset = refstring.indexOf("results/");
            let rid = refstring.substring(offset + 8);
            console.log("result added rid = " + rid);
            history.push("/results/edit/" + rid);
            return ref;

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
        return database.ref(`results/${id}`).remove().then(() => {
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
        return database.ref(`results/${id}`).update(updates).then(() => {
            dispatch(editResult(id, updates));
        });
    };
};

// SET_RESULTS
export const setResults = (results) => ({
    type: 'SET_RESULTS',
    results
});

export const startSetResults = () => {
    //console.log("startSetResults called");
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let resultsRef = database.ref('results');
        resultsRef.once('value', (snapshot) => {
            const results = [];
            snapshot.forEach((childSnapshot) => {
                // console.log("childSnapshot = " + JSON.stringify(childSnapshot, null, 2));
                results.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // console.log("results = " + JSON.stringify(results, null, 2));
            dispatch(setResults(results));
        });
        resultsRef.on('value', (snapshot) => {
            const results = [];
            snapshot.forEach((childSnapshot) => {
                results.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            // console.log("on results = " + JSON.stringify(results, null, 2));
            dispatch(setResults(results));
        });
    };
};
