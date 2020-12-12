import { gamesCursor }   from "../horizon/cursors";

export const startAddGame = (gameData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        gameData.createdBy = userName;
        const {
            description = '',
            name = '',
            box = '',
            createdAt = 0,
            createdBy = userName
        } = gameData;
        const game = { description, name, box, createdAt, createdBy };
        // console.log("about to store game: " + JSON.stringify(game, null, 2));
        gamesCursor.insert(game);
    };
};

export const startRemoveGame = ({ id } = {}) => {
    return (dispatch, getState) => {
        console.log("startRemoveGame id = " + id);
        gamesCursor.remove(id);
    };
};

export const startAddPlayerToGame = ({gid, pid} = {}) => {
    let updates = {};
    updates.players = {};
    updates.players[pid] = true;
    console.log("updates = " + JSON.stringify(updates, null, 2));
    return startEditGame(gid, updates);
};

export const startRemovePlayerFromGame = ({gid, pid} = {}) => {
    let updates = {};
    updates.players = {};
    updates.players[pid] = false;
    console.log("updates = " + JSON.stringify(updates, null, 2));
    return startEditGame(gid, updates);
};

export const startAddSubscriberToGame = ({gid, pid} = {}) => {
    let updates = {};
    updates.subscribers = {};
    updates.subscribers[pid] = true;
    console.log("updates = " + JSON.stringify(updates, null, 2));
    return startEditGame(gid, updates);
};

export const startRemoveSubscriberFromGame = ({gid, pid} = {}) => {
    let updates = {};
    updates.subscribers = {};
    updates.subscribers[pid] = false;
    console.log("updates = " + JSON.stringify(updates, null, 2));
    return startEditGame(gid, updates);
};


// EDIT_GAME
export const editGame = (id, updates) => ({
    type: 'EDIT_GAME',
    id,
    updates
});

export const startEditGame = (id, updates) => {
    // console.log("id = " + JSON.stringify(id));
    // updates.box.label = updates.box.label + " right?";
    console.log("updates = " + JSON.stringify({id, ...updates}, null, 2));
    return (dispatch, getState) => {
        gamesCursor.update({id, ...updates});
    };
};

export const startSetGameTurn = ({gid, tid} = {}) => {
    // console.log("uid = " + uid + " gid  = " + gid + " tid  = " + tid);
    let updates = {};
    updates['turn'] = tid;
    return startEditGame(gid, updates);
};

// SET_GAMES
export const setGames = (games) => ({
    type: 'SET_GAMES',
    games
});

export const startSetGames = () => {
    return (dispatch, getState) => {
        gamesCursor
            .order('id')
            .watch()
            .subscribe(allGames => {
                    const games = [];
                    allGames.map(g => {
                        games.push(g);
                    });
                    dispatch(setGames(games));
                },
                error => console.error(error)
            );
    };
};
