import moment from 'moment';

// Get visible rolls
// this should be called selectRollsf
export const selectRolls = (rolls, gid, player) => {
    console.log("selectRolls player = " + JSON.stringify(player, null, 2));
    if (player.games === undefined) {
        return [];
    }
    if (player.games[gid] === undefined) {
        return [];
    }
    let sortCol = player.games[gid].sortCol;
    let sortDir = player.games[gid].sortDir;
    let prevSortCol = player.games[gid].prevSortCol;
    let prevSortDir = player.games[gid].prevSortDir;
    let lines = player.games[gid].linesPerPage;
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
    })
        .sort((a, b) => {
            let vala, valb;
            if (col === "createdAt") {
                vala = a.createdAt;
                valb = b.createdAt;
            } else if (col === "player") {
                vala = a.createdBy;
                valb = b.createdBy;
            } else if (col === "turn") {
                vala = a.turn;
                valb = b.turn;
            } else if (col === "description") {
                vala = a.description;
                valb = b.description;
            } else if (col === "dice") {
                vala = a.dice;
                valb = b.dice;
            } else if (col === "sides") {
                vala = a.sides;
                valb = b.sides;
            } else if (col === "mod") {
                vala = a.mods;
                valb = b.mods;
            } else if (col === "result") {
                vala = a.result;
                valb = b.result;
            } else if (col === "epilogue") {
                vala = a.epilogue;
                valb = b.epilogue;
            }
            if (vala === valb) {
                let xvala, xvalb, xdir;
                if ((prevSortDir !== 1) && (prevSortDir !== -1)) {
                    xdir = 1;
                } else {
                    xdir = prevSortDir;
                }
                if (prevCol === "timestamp") {
                    xvala = a.createdAt;
                    xvalb = b.createdAt;
                } else if (prevCol === "player") {
                    xvala = a.createdBy;
                    xvalb = b.createdBy;
                } else if (prevCol === "turn") {
                    xvala = a.turn;
                    xvalb = b.turn;
                } else if (prevCol === "description") {
                    xvala = a.description;
                    xvalb = b.description;
                } else if (prevCol === "dice") {
                    xvala = a.dice;
                    xvalb = b.dice;
                } else if (prevCol === "sides") {
                    xvala = a.sides;
                    xvalb = b.sides;
                } else if (prevCol === "mod") {
                    xvala = a.mods;
                    xvalb = b.mods;
                } else if (prevCol === "result") {
                    xvala = a.result;
                    xvalb = b.result;
                } else if (prevCol === "epilogue") {
                    xvala = a.epilogue;
                    xvalb = b.epilogue;
                }
                return xvala < xvalb ? (xdir) : (-1 * xdir)
            }
            // console.log('vala = ' + vala + ', valb = ' + valb);
            return vala < valb ? (dir) : (-1 * dir)
        }).slice(0,lines);
    // console.log("rolls = " + JSON.stringify(rolls));
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

