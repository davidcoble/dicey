import moment from 'moment';
import { boxesCursor } from "../horizon/cursors";

export const startAddBox = (boxData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        const t = moment();
        const {
            name = '',
            description = '',
            sides = '',
            note = '',
            amount = 0,
            createdAt = t,
            createdBy = userName,
            turnList = '',
        } = boxData;
        const box = { name, description, sides, note, amount, createdAt, createdBy, turnList };
        boxesCursor.insert(box);
    };
};

export const startRemoveBox = ({ id } = {}) => {
    return (dispatch, getState) => {
        boxesCursor.remove(id);
    };
};

export const startEditBox = (id, updates) => {
    console.log("startEditBox updates = " + JSON.stringify(updates, null, 2));
    return (dispatch) => {
        // const t = moment();
        // console.log("t = " + t);
        // updates.lastModifiedTime = t;
        boxesCursor.update({id, ...updates});
    };
};

// SET_BOXES
export const setBoxes = (boxes) => ({
    type: 'SET_BOXES',
    boxes
});

export const startSetBoxes = () => {
    console.log("startSetBoxes running");
    return (dispatch, getState) => {
        boxesCursor
            .order('id')
            .watch()
            .subscribe(boxList => {
                    const boxes = [];
                    boxList.map(b => {
                        boxes.push(b);
                    });
                    dispatch(setBoxes(boxes));
                },
                error => console.error(error)
            );
    };
};
