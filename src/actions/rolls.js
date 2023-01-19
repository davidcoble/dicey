import database from '../firebase/firebase';

// ADD_ROLL
export const addRoll = (roll) => ({
    type: 'ADD_ROLL',
    roll
});

export const startAddRoll = (rollData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        rollData.createdBy = userName;
        const {
            id = '',
            description = '',
            dice = '',
            sides = '',
            mods = '',
            gid = '',
            turn = '',
            result = '',
            epilogue = '',
            createdAt = 0,
            createdBy = userName
        } = rollData;
        const roll = { id, description, dice, sides, mods, gid, turn, result, epilogue, createdAt, createdBy };
        // console.log("about to store roll: " + JSON.stringify(roll, null, 2));
        return database.ref(`rolls`).push(roll).then((ref) => {
            console.log("added roll ref = " + JSON.stringify(ref, null, 2));
        });
    };
};

// REMOVE_ROLL
export const removeRoll = ({ id } = {}) => ({
    type: 'REMOVE_ROLL',
    id
});

export const startRemoveRoll = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`rolls/${id}`).remove().then(() => {
            dispatch(removeRoll({ id }));
        });
    };
};

// DELETE_ROLL
export const deleteRoll = ({ id } = {}) => ({
    type: 'DELETE_ROLL',
    id
});

export const startDeleteRoll = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`rolls/${id}/deleters/${uid}`).set(true).then(() => {
            dispatch(deleteRoll({ id }));
        });
    };
};

// UNDELETE_ROLL
export const undeleteRoll = ({ id } = {}) => ({
    type: 'UNDELETE_ROLL',
    id
});

export const startUndeleteRoll = ({ id } = {}) => {
    // console.log("startUndeleteRoll id = " + id);
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`rolls/${id}/deleters/${uid}`).set(false).then(() => {
            dispatch(undeleteRoll({ id }));
        });
    };
};


// EDIT_ROLL
export const editRoll = (id, updates) => ({
    type: 'EDIT_ROLL',
    id,
    updates
});

export const startEditRoll = ({id, updates} = {}) => {
    // console.log("id = " + JSON.stringify(id));
    // console.log("updates = " + JSON.stringify(updates));
    return (dispatch, getState) => {
        updates.createdBy = getState().auth.name;
        return database.ref(`rolls/${id}`).update(updates).then(() => {
            // dispatch(editRoll(id, updates));
        });
    };
};

// SET_ROLLS
export const setRolls = (rolls) => ({
    type: 'SET_ROLLS',
    rolls
});

export const startSetRolls = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let rollsRef = database.ref('rolls');
        rollsRef.once('value', (snapshot) => {
            const rolls = [];
            snapshot.forEach((childSnapshot) => {
                rolls.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setRolls(rolls));
        });
        rollsRef.on('value', (snapshot) => {
            const rolls = [];
            snapshot.forEach((childSnapshot) => {
                rolls.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setRolls(rolls));
        });
    };
};
