import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_GAME
export const addGame = (game) => ({
    type: 'ADD_GAME',
    game
});

export const startAddGame = (gameData = {}) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        const {
            description = '',
            name = '',
            createdAt = 0,
            createdBy = userName
        } = gameData;
        const game = { description, name, createdAt, createdBy  };
        return database.ref(`games`).push(game).then((ref) => {
            dispatch(addGame({
                id: ref.key,
                ...game
            }));
        });
    };
};

// REMOVE_GAME
export const removeGame = ({ id } = {}) => ({
    type: 'REMOVE_GAME',
    id
});

export const startRemoveGame = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`games/${id}`).remove().then(() => {
            dispatch(removeGame({ id }));
        });
    };
};

// EDIT_GAME
export const editGame = (id, updates) => ({
    type: 'EDIT_GAME',
    id,
    updates
});

export const startEditGame = (id, updates) => {
    return (dispatch, getState) => {
        const userName = getState().auth.name;
        updates.createdBy = userName;
        return database.ref(`games/${id}`).update(updates).then(() => {
            dispatch(editGame(id, updates));
        });
    };
};

// SET_GAMES
export const setGames = (games) => ({
    type: 'SET_GAMES',
    games
});

export const startSetGames = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let gamesRef = database.ref('games');
        gamesRef.once('value', (snapshot) => {
            const games = [];
            snapshot.forEach((childSnapshot) => {
                games.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setGames(games));
        });
        gamesRef.on('value', (snapshot) => {
            const games = [];
            snapshot.forEach((childSnapshot) => {
                games.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setGames(games));
        });
    };
};
