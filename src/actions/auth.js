import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';


export const login = (auth) => {
    console.log("auth.login uid = " + auth.uid
        + " name = " + auth.name
        + " email = " + auth.email
        + " photoURL = " + auth.photoURL
        + " isAdmin = " + auth.isAdmin
    );
    return {
        type: 'LOGIN',
        ...auth
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

// export const setAdmin = (isAdmin) => {
//     return {
//         type: 'SET_ADMIN',
//         isAdmin
//     };
// };
//
// export const startSetAdmin = () => {
//     return (dispatch, getState) => {
//         const uid = getState().auth.uid;
//         console.log("startSetAdmin uid = " + uid);
//         let isAdmin = false;
//         database.ref(`users/${uid}/isAdmin`).on('value', (snapshot) =>{
//            isAdmin = snapshot;
//         });
//         dispatch(setAdmin(isAdmin));
//     };
// };

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
        let auth = getState().auth;
        const uid = auth.uid;
        const name = auth.name;
        const email = auth.email;
        const photoURL = auth.photoURL;
        auth.isAdmin = false;
        console.log("recording user's name in the database.  name = " + name);
        return database.ref(`users/${uid}/name`).set(name).then(() => {
            database.ref(`users/${uid}/loggedIn`).set(true);
        }).then(() => {
            database.ref(`users/${uid}/email`).set(email);
        }).then(() => {
            database.ref(`users/${uid}/photoURL`).set(photoURL);
        }).then(() => {
            database.ref(`users/${uid}/isAdmin`).on('value', (snap) => {
                console.log("ZZZZZZZZZZZZZZZ snap = " + JSON.stringify(snap));
                auth.isAdmin = JSON.stringify(snap);

            });
        }).then(() => {
            console.log("about to dispatch login auth = " + JSON.stringify(auth,null,4));
            dispatch(login(auth));
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
