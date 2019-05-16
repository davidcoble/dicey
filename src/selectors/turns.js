import moment from 'moment';

// Get visible turns
// this should be called selectTurnsf
export const selectTurns = (turns) => {
    //console.log("turns = " + JSON.stringify(turns));
    if (turns === undefined) {
        return [];
    }
    return turns.filter((turn) => {
        return true;
    });
};


// Get visible turns
// this should be called selectTurnsf
export const selectPlayerTurns = (turns, playerturns) => {
    //console.log("selectPlayerTurns turns = " + JSON.stringify(turns));
    //console.log("selectPlayerTurns playerturns = " + JSON.stringify(playerturns));
    if(playerturns === undefined)
        return [];
    return turns.filter((turn) => {
        const gid = turn.id;
        if (playerturns[gid]) {
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