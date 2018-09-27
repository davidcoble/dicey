import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';
import { login } from './auth';

export const setPlayers = (players, auth) => {
    console.log("setPlayers players = " + JSON.stringify(players, null, 4));
    players.map((player) => {
        if(player.uid === auth.uid) {
            console.log("logged in auth = " + JSON.stringify(auth, null, 4));
        }
    })
    return {
        type: 'SET_PLAYERS',
        players
    }
};

export const startSetPlayers = () => {
    return (dispatch, getState) => {
        let auth = getState().auth;
        let uid = auth.uid;
        let usersRef = database.ref('users');
        usersRef.once('value').then((snapshot) => {
            //console.log("users snapshot = " + JSON.stringify(snapshot));
            const players = [];
            snapshot.forEach((child) => {
                //let val = local_obj[key];
                let key = child.key;
                if(auth.uid == child.key) {
                    // auth = child.val();
                    // auth.uid = uid;
                    console.log("about to dispatch login auth = " + JSON.stringify(auth,null,4));
                    dispatch(login(auth));
                }
                console.log("single user key " + key + " val " + JSON.stringify(child));
                players.push({
                    uid: child.key,
                    ...child.val()
                });
            });
            //console.log("startSetPlayers players = " + JSON.stringify(players, null, 4));
            dispatch(setPlayers(players, auth));
        });

        usersRef.on('value', (snapshot) => {
            const players = [];
            console.log("users updated: snapshot = " + JSON.stringify(snapshot));
            snapshot.forEach((child) => {
                players.push({
                    uid: child.key,
                    ...child.val()
                });
                console.log("users updated: child = " + JSON.stringify(child));
                console.log("users updated: child.key = " + JSON.stringify(child.key));
                console.log("users updated: auth = " + JSON.stringify(auth,null,4));
                if(auth.uid === child.key) {
                    console.log("they match!");
                    console.log("child.val().isAdmin = " + child.val().isAdmin);
                    if(child.val().isAdmin === 'true') {
                        auth.isAdmin = 'true';
                    }
                    let newAuth = {
                        isAdmin: child.val().isAdmin,
                        ...auth
                    };
                    console.log("about to dispatch login auth = " + JSON.stringify(newAuth, null, 4));
                    dispatch(login(newAuth));
                }
            });
            dispatch(setPlayers(players, auth));
        });
    };
};

export const makePlayerAdmin = (uid, isAdmin) => ({
    type: 'EDIT_PLAYER',
    uid,
    isAdmin
});

export const startMakePlayerAdmin = (uid, isAdmin) => {
    return (dispatch, getState) => {
        return database.ref(`users/${uid}/isAdmin`).set(isAdmin).then(() => {
            dispatch(makePlayerAdmin(uid, isAdmin));
        });
    };
};