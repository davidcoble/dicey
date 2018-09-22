import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';


export const login = (uid, name, email, photoURL) => {
    console.log("auth.login uid = " + uid
        + " name = " + name
        + " email = " + email
        + " photoURL = " + photoURL);
    return {
        type: 'LOGIN',
        uid,
        name,
        email,
        photoURL
    }
};

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
        const email = getState().auth.email;
        const photoURL = getState().auth.photoURL;
        let isAdmin = false;
        getState().players.map((player) => {
            if (player.uid === uid) {
                isAdmin = player.isAdmin;
            }
        });
        console.log("recording user's name in the database.  name = " + name);
        return database.ref(`users/${uid}/name`).set(name).then(() => {
            database.ref(`users/${uid}/loggedIn`).set(true);
        }).then(() => {
            database.ref(`users/${uid}/email`).set(email);
        }).then(() => {
            database.ref(`users/${uid}/photoURL`).set(photoURL);
        }).then(() => {
            dispatch(login(uid, name, email, photoURL));
        });
    };
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
