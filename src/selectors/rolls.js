import moment from 'moment';

// Get visible rolls
// this should be called selectRollsf
export const selectRolls = (rolls) => {
    if (rolls === undefined) {
        return [];
    }
    //console.log("rolls = " + JSON.stringify(rolls));
    return rolls.filter((roll) => {
        return true;
    });
    // .sort((a, b) => {
    //     //console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
    //     return a.name < b.name ? -1 : 1;
    //     // if (sortBy === 'name') {
    //     //     console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
    //     //     return b.name < a.name ? -1 : 1;
    //     // } else if (sortBy === 'amount') {
    //     //     return a.amount < b.amount ? 1 : -1;
    //     // }
    // });
};


// Get visible rolls
// this should be called selectRolls
export const selectPlayerRolls = (rolls, playerrolls) => {
    //console.log("selectPlayerRolls rolls = " + JSON.stringify(rolls));
    //console.log("selectPlayerRolls playerrolls = " + JSON.stringify(playerrolls));
    if(playerrolls === undefined)
        return [];
    return rolls.filter((roll) => {
        const gid = roll.id;
        if (playerrolls[gid]) {
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