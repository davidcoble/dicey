import database from '../firebase/firebase';
import { login } from './auth';

export const setPlayers = (players, auth) => {
    return {
        type: 'SET_PLAYERS',
        players
    }
};

export const startSetPlayers = () => {
    return (dispatch, getState) => {
        let auth = getState().auth;
        let uid = auth.uid;
        let playersRef = database.ref('players');
        playersRef.once('value').then((snapshot) => {
            // console.log("users snapshot = " + JSON.stringify(snapshot));
            const players = [];
            snapshot.forEach((child) => {
                //let val = local_obj[key];
                let key = child.key;
                if(auth.uid == child.key) {
                    // auth = child.val();
                    // auth.uid = uid;
                    dispatch(login(auth));
                }
                players.push({
                    uid: child.key,
                    ...child.val()
                });
            });
            dispatch(setPlayers(players, auth));
        });

        playersRef.on('value', (snapshot) => {
            const players = [];
            snapshot.forEach((child) => {
                players.push({
                    uid: child.key,
                    ...child.val()
                });
                if(auth.uid === child.key) {
                    if(child.val().isAdmin === 'true') {
                        auth.isAdmin = 'true';
                    }
                    let newAuth = {
                        isAdmin: child.val().isAdmin,
                        ...auth
                    };
                    dispatch(login(newAuth));
                }
            });
            dispatch(setPlayers(players, auth));
        });
    };
};


export const setPlayerRollingGame = (uid, gid) => ({
    type: "EDIT_PLAYER",
    rollingGame: {gid}
});

export const startSetPlayerRollingGame = ({uid, gid} = {}) => {
    // console.log("uid = " + uid + " gid  = " + gid);
    return (dispatch, getState) => {
        return database.ref(`players/${uid}/rollingGame`).set(gid).then(() => {
            dispatch(setPlayerRollingGame(uid, gid));
        });
    };
};

export const setPlayerRollingGameTurn = (uid, gid, tid) => ({
    type: "EDIT_PLAYER",
    rollingGame: {gid}
});

export const startSetPlayerRollingGameTurn = ({uid, gid, tid} = {}) => {
    // console.log("uid = " + uid + " gid  = " + gid + " tid  = " + tid);
    return (dispatch, getState) => {
        return database.ref(`players/${uid}/games/${gid}/turn`).set(tid).then(() => {
            dispatch(setPlayerRollingGameTurn(uid, gid, tid));
        });
    };
};

export const addGameToPlayer = (playerId, gameId) => ({
    type: 'ADD_GAME_TO_PLAYER',
    playerId,
    gameId
});

export const startAddGameToPlayer = ({gid, pid} = {}) => {
    // console.log(" startAddGameToPlayer; playerId = " + pid);
    return (dispatch) => {
        return database.ref(`players/${pid}/games/${gid}/in`).set(true).then(() => {
           dispatch(addGameToPlayer(pid, gid));
        });
    };
};

export const removeGameFromPlayer = (playerId, gameId) => ({
    type: 'REMOVE_GAME_FROM_PLAYER',
    playerId,
    gameId
});

export const startRemoveGameFromPlayer = ({gid, pid} = {}) => {
    // console.log("startRemoveGameFromPlayer; playerId = " + gid);
    return (dispatch, getState) => {
        return database.ref(`players/${pid}/games/${gid}/in`).set(false).then(() => {
            dispatch(removeGameFromPlayer(pid, gid));
        });
    }
};

export const makePlayerAdmin = (uid, isAdmin) => ({
    type: 'EDIT_PLAYER',
    uid,
    isAdmin
});

export const startMakePlayerAdmin = (uid, isAdmin) => {
    return (dispatch, getState) => {
        return database.ref(`players/${uid}/isAdmin`).set(isAdmin).then(() => {
            dispatch(makePlayerAdmin(uid, isAdmin));
        });
    };
};

export const setHideNotPlaying = (uid, hideNotPlaying) => ({
    type: 'EDIT_PLAYER',
    uid,
    hideNotPlaying
});

export const startSetHideNotPlaying = (uid, hideNotPlaying) => {
    return (dispatch, getState) => {
        return database.ref(`players/${uid}/hideNotPlaying`).set(hideNotPlaying).then(() => {
            dispatch(setPlayerHideNotPlaying(uid, hideNotPlaying));
        });
    };
};