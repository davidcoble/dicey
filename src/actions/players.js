import { firebase, googleAuthProvider } from '../firebase/firebase';
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
            //console.log("users snapshot = " + JSON.stringify(snapshot));
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

export const addGame = (playerId, gameId) => ({
    type: 'ADD_GAME_TO_PLAYER',
    playerId,
    gameId
});

export const startAddGame = (playerId, gameId) => {
    return (dispatch, getState) => {
        return database.ref(`players/${playerId}/games`).push(gameId).then( () => {
           dispatch(addGame(playerId, gameId));
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