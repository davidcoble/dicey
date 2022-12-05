import moment from 'moment';

// Get visible rolls
// this should be called selectRolls
export const selectRolls = (rolls, gid, player) => {
    // console.log("selectors/rolls.js player = " + JSON.stringify(player, null, 2));
    let showafew = 3;
    return rolls.filter((roll) => {
        return roll.gid === gid;
    }).sort((a, b) => {
        // if ( showafew > 0 ) {
        //     console.log("Comparison " + showafew);
        //     console.log("    a.createdAt = " + a.createdAt);
        //     console.log("    b.createdAt = " + b.createdAt);
        // }
        return b.createdAt - a.createdAt;
    });
};

export const selectGamePlayersForCC = (players, game, uid) => {
    let cc_list = [];
    if (game === undefined) {
        return cc_list;
    }
    players.filter((p) => {
        return p.games && p.games[game.id] && p.games[game.id].in
            && game.subscribers && game.subscribers[p.uid];
    }).map((p) => {
        cc_list.push(p.email);
    });
    return cc_list;
};

// Get visible rolls
// this should be called selectRolls
export const selectPlayerRolls = (rolls, playerrolls) => {
    //console.log("selectPlayerRolls rolls = " + JSON.stringify(rolls));
    //console.log("selectPlayerRolls playerrolls = " + JSON.stringify(playerrolls));
    if (playerrolls === undefined)
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
    });
};

