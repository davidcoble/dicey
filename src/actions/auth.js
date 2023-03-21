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
        console.log("startLogin callback called.");
        let retval = firebase.auth().signInWithPopup(googleAuthProvider);
        return retval;
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
        let my_state = getState();
        // console.log("my_state = " + JSON.stringify(my_state, null, 2));
        const uid = auth.uid;
        const name = auth.name;
        const email = auth.email;
        const photoURL = auth.photoURL;
        const isAdmin = auth.isAdmin;
        return database.ref(`login/${uid}/name`).set(name).then(() => {
            database.ref(`login/${uid}/loggedIn`).set(true);
        }).then(() => {
            database.ref(`login/${uid}/email`).set(email);
        }).then(() => {
            database.ref(`login/${uid}/photoURL`).set(photoURL);
        }).then(() => {
            database.ref(`login/${uid}/isAdmin`).set(isAdmin);
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
            database.ref(`login/${uid}/loggedIn`).set(false);
        });
    };
};
