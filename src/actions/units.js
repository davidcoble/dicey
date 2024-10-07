import database from '../firebase/firebase';

// ADD_UNIT
export const addUnit = (unit) => ({
    type: 'ADD_UNIT',
    unit
});

export const startAddUnit = (unitData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        unitData.createdBy = userName;
        const {
            description = '',
            dice = '',
            sides = '',
            mods = '',
            gid = '',
            turn = '',
            sum = false,
            result = '',
            epilogue = '',
            createdAt = 0,
            createdBy = userName
        } = unitData;
        const unit = { description, dice, sides, mods, sum, gid, turn, result, epilogue, createdAt, createdBy };
        console.log("about to store unit: " + JSON.stringify(unit, null, 2));
        return database.ref(`units`).push(unit).then((ref) => {
            // console.log("added unit");
        });
    };
};

// REMOVE_UNIT
export const removeUnit = ({ id } = {}) => ({
    type: 'REMOVE_UNIT',
    id
});

export const startRemoveUnit = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`units/${id}`).remove().then(() => {
            dispatch(removeUnit({ id }));
        });
    };
};

// DELETE_UNIT
export const deleteUnit = ({ id } = {}) => ({
    type: 'DELETE_UNIT',
    id
});

export const startDeleteUnit = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`units/${id}/deleters/${uid}`).set(true).then(() => {
            dispatch(deleteUnit({ id }));
        });
    };
};

// UNDELETE_UNIT
export const undeleteUnit = ({ id } = {}) => ({
    type: 'UNDELETE_UNIT',
    id
});

export const startUndeleteUnit = ({ id } = {}) => {
    // console.log("startUndeleteUnit id = " + id);
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`units/${id}/deleters/${uid}`).set(false).then(() => {
            dispatch(undeleteUnit({ id }));
        });
    };
};


// EDIT_UNIT
export const editUnit = (id, updates) => ({
    type: 'EDIT_UNIT',
    id,
    updates
});

export const startEditUnit = ({id, updates} = {}) => {
    // console.log("id = " + JSON.stringify(id));
    console.log("startEditUnit updates = " + JSON.stringify(updates));
    return (dispatch, getState) => {
        //updates.createdBy = getState().auth.name;
        return database.ref(`units/${id}`).update(updates).then(() => {
            // dispatch(editUnit(id, updates));
        });
    };
};
export const editUnitEpilogue = (id, epilogue) => ({
    type: 'EDIT_UNIT_EPILOGUE',
    id,
    epilogue
});

export const startEditUnitEpilogue = ({id, epilogue} = {}) => {
    // console.log("id = " + JSON.stringify(id));
    const updates = {epilogue};
    console.log("startEditUnitEpilogue updates = " + JSON.stringify(updates));
    return (dispatch, getState) => {
        //updates.createdBy = getState().auth.name;
        return database.ref(`units/${id}`).update(updates).then(() => {
            // dispatch(editUnit(id, updates));
        });
    };
};

// SET_UNITS
export const setUnits = (units) => ({
    type: 'SET_UNITS',
    units
});

export const startSetUnits = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let unitsRef = database.ref('units');
        unitsRef.once('value', (snapshot) => {
            const units = [];
            snapshot.forEach((childSnapshot) => {
                units.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setUnits(units));
        });
        unitsRef.on('value', (snapshot) => {
            const units = [];
            snapshot.forEach((childSnapshot) => {
                units.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setUnits(units));
        });
    };
};
