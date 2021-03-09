import moment from 'moment';

// Get visible rolls
// this should be called selectRolls
export const selectRolls = (rolls, gid, player) => {
    //console.log("selectors/rolls.js player = " + JSON.stringify(player, null, 2));
    let sortCol = player.games[gid].sortCol;
    let sortDir = player.games[gid].sortDir;
    let prevSortCol = player.games[gid].prevSortCol;
    let prevSortDir = player.games[gid].prevSortDir;
    let lines = player.games[gid].linesPerPage;
    lines = 30;
    // let pageNum = player.games[gid].pageNum;
    // console.log("in selectRolls, lines  = " + lines);
    // console.log("in selectRolls, gid  = " + gid);
    let col, dir, prevCol, prevDir;
    if (rolls === undefined || gid === undefined) {
        return [];
    }
    if (sortCol === "") {
        col = "createdAt";
    } else {
        col = sortCol;
    }
    if (prevSortCol === "") {
        prevCol = "player";
    } else {
        prevCol = prevSortCol;
    }
    if ((sortDir !== 1) && (sortDir !== -1)) {
        dir = 1;
    } else {
        dir = sortDir;
    }
    if ((prevSortDir !== 1) && (prevSortDir !== -1)) {
        prevDir = 1;
    } else {
        prevDir = prevSortDir;
    }
    return rolls.filter((roll) => {
        return roll.gid === gid;
    }).sort((a, b) => {
        return a.createdAt < b.createdAt;
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

