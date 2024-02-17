import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_GAME
export const addGame = (game) => ({
    type: 'ADD_GAME',
    game
});

export const startAddGame = (gameData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        console.log("startAddGame gameData.box = " + JSON.stringify(gameData.box, null, 2));
        // console.log("startAddGame boxes = " + JSON.stringify(getState().boxes, null, 2));
        const dbBox = getState().boxes.find((box) => box.id === gameData.box.value);
        const forcepools = dbBox.forcepools;
        console.log("startAddGame forcepools = " + JSON.stringify(forcepools, null, 2));
        const {
            description = '',
            name = '',
            box = '',
            createdAt = 0,
            createdBy = userName
        } = gameData;
        const game = { description, name, box, forcepools, createdAt, createdBy };
        // console.log("about to store game: " + JSON.stringify(game, null, 2));
        return database.ref(`games`).push(game).then((ref) => {

            // console.log("added game");
        });
    };
};

// REMOVE_GAME
export const removeGame = ({ id } = {}) => ({
    type: 'REMOVE_GAME',
    id
});

export const startRemoveGame = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`games/${id}/deleted`).set(true).then(() => {
            dispatch(removeGame({ id }));
        });
    };
};

// UNDELETE_GAME
export const undeleteGame = ({ id } = {}) => ({
    type: 'UNDELETE_GAME',
    id
});

export const startUndeleteGame = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`games/${id}/deleted`).set(false).then(() => {
            dispatch(undeleteGame({ id }));
        });
    };
};

export const addPlayerToGame = (gameId, playerId) => ({
    type: 'ADD_PLAYER_TO_GAME',
    gameId,
    playerId
});

export const startAddPlayerToGame = ({ gid, pid } = {}) => {
    console.log("startAddPlayerToGame; gameId = " + gid + " pid = " + pid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/players/${pid}`).set(true).then(() => {
            dispatch(addPlayerToGame(gid, pid));
        });
    }
};

export const removePlayerFromGame = (gameId, playerId) => ({
    type: 'REMOVE_PLAYER_FROM_GAME',
    gameId,
    playerId
});

export const startRemovePlayerFromGame = ({ gid, pid } = {}) => {
    //console.log("startRemovePlayerFromGame; gameId = " + gid);
    //console.log("startRemovePlayerFromGame; playerId = " + pid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/players/${pid}`).set(false).then(() => {
            dispatch(removePlayerFromGame(gid, pid));
        });
    }
};

export const addSubscriberToGame = (gameId, subscriberId) => ({
    type: 'ADD_SUBSCRIBER_TO_GAME',
    gameId,
    subscriberId
});

export const startAddSubscriberToGame = ({ gid, uid } = {}) => {
    console.log("startAddSubscriberToGame; gameId = " + gid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/subscribers/${uid}`).set(true).then(() => {
            dispatch(addSubscriberToGame(gid, uid));
        });
    }
};

export const removeSubscriberFromGame = (gameId, subscriberId) => ({
    type: 'REMOVE_SUBSCRIBER_FROM_GAME',
    gameId,
    subscriberId
});

export const startRemoveSubscriberFromGame = ({ gid, uid } = {}) => {
    // console.log("startRemoveSubscriberFromGame; gameId = " + gid);
    // console.log("startRemoveSubscriberFromGame; userId = " + uid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/subscribers/${uid}`).set(false).then(() => {
            dispatch(removeSubscriberFromGame(gid, uid));
        });
    }
};

export const setGameTokenData = (gid, data) => (
    {
        type: 'SET_GAME_TOKEN_DATA',
        gid,
        ...data
    }
)

export const startSetGameTokenData = (gid, data) => {
    // console.log("startSetGameTokenData  gid = " + JSON.stringify(gid));
    // console.log("startSetGameTokenData  data = " + JSON.stringify(data, null, 2));
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/units/${data.id}`).set(
            data
        ).then(() => {
            dispatch(setGameTokenData(gid, data));
        })
    }

}

// EDIT_GAME
export const editGame = (id, updates) => ({
    type: 'EDIT_GAME',
    id,
    updates
});

export const startEditGame = (id, updates) => {
    console.log("id = " + JSON.stringify(id));
    console.log("updates = " + JSON.stringify(updates));
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        updates.createdBy = userName;
        return database.ref(`games/${id}`).update(updates).then(() => {
            dispatch(editGame(id, updates));
        });
    };
};

export const setGameTurn = (gid, tid) => ({
    type: "EDIT_GAME",
    currentTurn: { tid }
});

export const startSetGameTurn = ({ gid, tid } = {}) => {
    // console.log("uid = " + uid + " gid  = " + gid + " tid  = " + tid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/turn`).set(tid).then(() => {
            dispatch(setGameTurn(gid, tid));
        });
    };
};

// SET_GAMES
export const setGames = (games) => ({
    type: 'SET_GAMES',
    games
});

export const startSetGames = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let gamesRef = database.ref('games');
        gamesRef.once('value', (snapshot) => {
            const games = [];
            snapshot.forEach((childSnapshot) => {
                games.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setGames(games));
        });
        gamesRef.on('value', (snapshot) => {
            const games = [];
            snapshot.forEach((childSnapshot) => {
                games.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setGames(games));
        });
    };
};
