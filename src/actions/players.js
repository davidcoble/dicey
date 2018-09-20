import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';

export const setPlayers = (players) => ({
   type: 'SET_PLAYERS',
   players
});

export const startSetPlayers = () => {
    return (dispatch, getState) => {
        return database.ref('users').once('value').then((snapshot) => {
            console.log("users snapshot = " + JSON.stringify(snapshot));
            const players = [];
            let key = '';
            let local_obj = {};
            eval("local_obj = " + JSON.stringify(snapshot))
            for(key in local_obj)
            {
                let val = local_obj[key];
                console.log("single user key " + key + " val " + JSON.stringify(val));
                players.push({
                    uid: key,
                    name: val.name,
                    loggedIn: val.loggedIn,
                    path: val.path
                });
            };
            dispatch(setPlayers(players));
        });
    };
};
