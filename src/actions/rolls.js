import { rollsCursor } from "../horizon/cursors";

export const startAddRoll = (rollData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        rollData.createdBy = userName;
        const {
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
        const roll = { description, dice, sides, mods, gid, turn, result, epilogue, createdAt, createdBy };
        // console.log("about to store roll: " + JSON.stringify(roll, null, 2));
        rollsCursor.insert(roll);
    };
};

export const startRemoveRoll = ({ id } = {}) => {
    return (dispatch, getState) => {
        rollsCursor.remove(id);
    };
};

export const startEditRoll = ({id, updates} = {}) => {
    // console.log("id = " + JSON.stringify(id));
    // console.log("updates = " + JSON.stringify(updates));
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        updates.createdBy = userName;
        rollsCursor.update({id, ...updates});
    };
};

// SET_ROLLS
export const setRolls = (rolls) => ({
    type: 'SET_ROLLS',
    rolls
});

export const startSetRolls = () => {
    return (dispatch, getState) => {
        rollsCursor
            .order('id')
            .watch()
            .subscribe(allRolls => {
                    const rolls = [];
                    allRolls.map(g => {
                        rolls.push(g);
                    });
                    dispatch(setRolls(rolls));
                },
                error => console.error(error)
            );
    };
};
