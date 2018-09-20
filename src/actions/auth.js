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
        console.log("recording user's path in the database.  path = " + path);
        return database.ref(`users/${uid}/personal/path`).set(path);
    }
}

export const startSetLoggedIn = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const name = getState().auth.name;
        console.log("recording user's name in the database.  name = " + name);
        return database.ref(`users/${uid}/personal`).set({
            name,
            loggedIn: true
        });
    }
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        //const uid = getState().auth.uid;
        return firebase.auth().signOut();
    };
};
