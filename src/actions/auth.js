import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';


export const login = (uid, name) => ({
    type: 'LOGIN',
    uid,
    name
});

export const startLogin = () => {
    googleAuthProvider.setCustomParameters({
        'prompt': 'select_account'
    });
    return () => {
        console.log("logging in");
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startSaveUserPage = (path) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        if(uid) {
            console.log("recording user's path in the database.  path = " + path);
            return database.ref(`users/${uid}/path`).set(path);
        }
    }
}

export const startSetLoggedIn = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const name = getState().auth.name;
        console.log("recording user's name in the database.  name = " + name);
        return database.ref(`users/${uid}/name`).set(name).then(() => {
            database.ref(`users/${uid}/loggedIn`).set(true);
        });
    }
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        console.log("logging out uid = " + uid);
        return firebase.auth().signOut().then(() => {
            database.ref(`users/${uid}/loggedIn`).set(false);
        });
    };
};
