import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_GAME
export const addGame = (game) => ({
    type: 'ADD_GAME',
    game
});

export const startAddGame = (gameData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            description = '',
            createdAt = 0,
            createdBy = uid
        } = gameData;
        const game = { name, description, createdAt, createdBy };
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
    return (dispatch) => {
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
    return (dispatch) => {
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
    return (dispatch) => {
        return database.ref(`games`).once('value').then((snapshot) => {
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
