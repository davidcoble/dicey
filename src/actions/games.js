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
        gameData.createdBy = userName;
        const {
            description = '',
            name = '',
            box = '',
            createdAt = 0,
            createdBy = userName
        } = gameData;
        const game = { description, name, box, createdAt, createdBy };
        console.log("about to store game: " + JSON.stringify(game, null, 2));
        return database.ref(`games`).push(game).then((ref) => {
            console.log("added game");
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
        return database.ref(`games/${id}`).remove().then(() => {
            dispatch(removeGame({ id }));
        });
    };
};

export const addPlayerToGame = (gameId, playerId) => ({
    type: 'ADD_PLAYER_TO_GAME',
    gameId,
    playerId
});

export const startAddPlayerToGame = ({gid, pid} = {}) => {
    console.log("startAddPlayerToGame; gameId = " + gid);
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

export const startRemovePlayerFromGame = ({gid, pid} = {}) => {
    console.log("startRemovePlayerFromGame; gameId = " + gid);
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

export const startAddSubscriberToGame = ({gid, pid} = {}) => {
    console.log("startAddSubscriberToGame; gameId = " + gid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/subscribers/${pid}`).set(true).then(() => {
            dispatch(addSubscriberToGame(gid, pid));
        });
    }
};

export const removeSubscriberFromGame = (gameId, subscriberId) => ({
    type: 'REMOVE_SUBSCRIBER_FROM_GAME',
    gameId,
    subscriberId
});

export const startRemoveSubscriberFromGame = ({gid, pid} = {}) => {
    console.log("startRemoveSubscriberFromGame; gameId = " + gid);
    return (dispatch, getState) => {
        return database.ref(`games/${gid}/subscribers/${pid}`).set(false).then(() => {
            dispatch(removeSubscriberFromGame(gid, pid));
        });
    }
};


// EDIT_GAME
export const editGame = (id, updates) => ({
    type: 'EDIT_GAME',
    id,
    updates
});

export const startEditGame = (id, updates) => {
    // console.log("id = " + JSON.stringify(id));
    // console.log("updates = " + JSON.stringify(updates));
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        updates.createdBy = userName;
        return database.ref(`games/${id}`).update(updates).then(() => {
            dispatch(editGame(id, updates));
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
