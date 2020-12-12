import database, {firebase, googleAuthProvider} from '../firebase/firebase';
import {playersCursor} from "../horizon/cursors";
import {v4} from "uuid";


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

export const startSaveUserPage = (path) => {
    //console.log("startSaveUserPage called with path = " + path);
    return (dispatch, getState) => {
        // //console.log("state = " + JSON.stringify(getState()));
        // const pid = getState().auth.pid;
        // //console.log("pid="+pid);
        // if(pid) {
        //     return database.ref(`players/${pid}/path`).set(path);
        // }
    }
}

export const startSetLoggedIn = () => {
    console.log("startSetLoggedIn");
    return (dispatch, getState) => {
        playersCursor.fetch().subscribe(
            result => {
                //console.log('Result:', JSON.stringify(result));
                const date = Date.now();
                let update = {
                    uid: getState().auth.uid,
                    name: getState().auth.name,
                    email: getState().auth.email,
                    photoURL: getState().auth.photoURL,
                    lastLogin: date,
                    isAdmin: false,
                };
                let found = null;
                result.map(r => {
                    //console.log("r = " + JSON.stringify(r));
                    //playersCursor.remove(r);
                    if (r.uid === getState().auth.uid) {
                        found = r.id;
                    }
                });
                // TODO: get rid of this hard-coding
                if(getState().auth.uid === 'rmw3LZhztjP0fhiWXopehZxjQ3B2') {
                    update.isAdmin = true;
                }
                // console.log('found = ', found);
                // console.log('update = ', JSON.stringify(update, null, 2));
                if (found == null) {
                    const uuid = v4();
                    console.log("creating player with id = " + uuid);
                    playersCursor.insert({id: uuid, ...update});
                    getState().auth.pid = uuid;
                } else {
                    playersCursor.update({id: found, ...update});
                    getState().auth.pid = found;
                }
            },
            err => console.error(err),
            () => console.log('Results fetched')
        );
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            dispatch(logout());
        });
    };
};
