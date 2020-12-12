import { playersCursor } from "../horizon/cursors";

export const setPlayers = (players) => {
    return {
        type: 'SET_PLAYERS',
        players
    }
};

export const startSetPlayers = () => {
    console.log("startSetPlayers running");
    return (dispatch, getState) => {
        let auth = getState().auth;
        playersCursor
            .order('id')
            .watch()
            .subscribe(allPlayers => {
                    const players = [];
                    // console.log("playerCursor allPlayers = "
                    //     + JSON.stringify(allPlayers, null, 2));
                    allPlayers.map(p => {
                        players.push(p);
                    });
                    dispatch(setPlayers(players));

                },
                error => console.error(error)
            );

    };
};

export const startSetPlayerRollingGame = ({pid, gid} = {}) => {
    // console.log("pid = " + pid + " gid  = " + gid);
    return (dispatch, getState) => {
        let update = {
            id: pid,
            rollingGame: gid,
        }
        playersCursor.update(update);
    };
};

export const startSetPlayerRollingGameTurn = ({pid, gid, tid} = {}) => {
    // console.log("pid = " + pid + " gid  = " + gid + " tid  = " + tid);
    return (dispatch, getState) => {
        let update = {};
        update.id = pid;
        update.games = {};
        update.games[gid] = {};
        update.games[gid].turn = tid;
        playersCursor.update(update);
    };
};

export const startAddGameToPlayer = ({gid, pid} = {}) => {
    return addOrRemoveGameFromPlayer({gid, pid, add: true});
};


export const startRemoveGameFromPlayer = ({gid, pid} = {}) => {
    return addOrRemoveGameFromPlayer({gid, pid, add: false});
};

const addOrRemoveGameFromPlayer = ({gid, pid, add} = {}) => {
    // console.log(" addOrRemoveGameFromPlayer; " +
    //     "gid = " + gid + " pid = " + pid + " add = " + add);
    return () => {
        let update = {id: pid};
        update.games = {};
        update.games[gid] = {};
        update.games[gid].in = add;
        // console.log("addOrRemoveGameFromPlayer update = " +
        //     JSON.stringify(update, null, 2));
        try {
            playersCursor.update(update);
        } catch (e) {
            console.log("ERROR  = " + JSON.stringify(e));
        }
    };

}

export const startHideNotPlaying = (pid, bHide) => {
    return () => {
        let update = {id: pid};
        update.hideNotPlaying = bHide;
        playersCursor.update(update);
    };
};


export const startMakePlayerAdmin = (pid, isAdmin) => {
    return () => {
        let update = {id: pid};
        update.isAdmin = isAdmin;
        playersCursor.update(update);
    };
};