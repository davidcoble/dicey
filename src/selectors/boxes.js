import moment from 'moment';

// Get visible boxes
// this should be called selectBoxesf
export const selectBoxes = (boxes) => {
    //console.log("boxes = " + JSON.stringify(boxes));
    if (boxes === undefined) {
        return [];
    }
    return boxes.filter((box) => {
        return true;
    });
};


// Get visible boxes
// this should be called selectBoxesf
export const selectPlayerBoxes = (boxes, playerboxes) => {
    //console.log("selectPlayerBoxes boxes = " + JSON.stringify(boxes));
    //console.log("selectPlayerBoxes playerboxes = " + JSON.stringify(playerboxes));
    if(playerboxes === undefined)
        return [];
    return boxes.filter((box) => {
        const gid = box.id;
        if (playerboxes[gid]) {
            return true;
        }
        return false;
    }).sort((a, b) => {
        //console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        return a.name < b.name ? -1 : 1;
        // if (sortBy === 'name') {
        //     console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        //     return b.name < a.name ? -1 : 1;
        // } else if (sortBy === 'amount') {
        //     return a.amount < b.amount ? 1 : -1;
        // }
    });
};

{}