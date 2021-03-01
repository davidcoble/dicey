import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';


export const login = (auth) => {
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
    //console.log("startSaveUserPage called with path = " + path);
    return (dispatch, getState) => {
        //console.log("state = " + JSON.stringify(getState(), null, 2));
        const uid = getState().auth.uid;
        //console.log("uid="+uid);
        if(uid) {
            return database.ref(`players/${uid}/path`).set(path);
        }
    };
};

export const startSetLoggedIn = () => {
    return (dispatch, getState) => {
        let auth = getState().auth;
        const uid = auth.uid;
        const name = auth.name;
        const email = auth.email;
        const photoURL = auth.photoURL;
        //auth.isAdmin = false;
        return database.ref(`players/${uid}/name`).set(name).then(() => {
            database.ref(`players/${uid}/loggedIn`).set(true);
        }).then(() => {
            database.ref(`players/${uid}/email`).set(email);
        }).then(() => {
            database.ref(`players/${uid}/photoURL`).set(photoURL);
        }).then(() => {
            database.ref(`players/${uid}/isAdmin`).on('value', (snap) => {
                auth.isAdmin = JSON.stringify(snap);

            });
        }).then(() => {
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
        return firebase.auth().signOut().then(() => {
            database.ref(`players/${uid}/loggedIn`).set(false);
        });
    };
};
