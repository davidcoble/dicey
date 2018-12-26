import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddGame,
    addGame,
    editGame,
    startEditGame,
    removeGame,
    startRemoveGame,
    setGames,
    startSetGames
} from '../../actions/games';
import games from '../fixtures/games';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const gamesData = {};
    games.forEach(({ id, description, name, createdAt, createdBy }) => {
        gamesData[id] = { description, name, createdAt, createdBy };
    });
    database.ref(`games`).set(gamesData).then(() => done());
});

test('should setup remove game action object', () => {
    const action = removeGame({ id: '123abc' });
    console.log("action = " + JSON.stringify(action, null, 4));
    expect(action).toEqual({
        type: 'REMOVE_GAME',
        id: '123abc'
    });
});

test('should remove game from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = games[2].id;
    store.dispatch(startRemoveGame({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_GAME',
            id
        });
        return database.ref(`games/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should setup edit game action object', () => {
    const action = editGame('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_GAME',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should edit game from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = games[0].id;
    const updates = { name: "znerf" };
    store.dispatch(startEditGame(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_GAME',
            id,
            updates
        });
        return database.ref(`games/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().name).toBe(updates.name);
        done();
    });
});

test('should setup add game action object with provided values', () => {
    const action = addGame(games[2]);
    expect(action).toEqual({
        type: 'ADD_GAME',
        game: games[2]
    });
});

test('should add game to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const gameData = {
        description: 'Mouse',
        name: 'This one is better',
        createdAt: 1000,
        createdBy: uid
    };

    store.dispatch(startAddGame(gameData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_GAME',
            game: {
                id: expect.any(String),
                ...gameData
            }
        });

        return database.ref(`games/${actions[0].game.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(gameData);
        done();
    });
});

test('should add game with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const gameDefaults = {
        description: '',
        name: '',
        createdAt: 0,
        createdBy: ''
    };

    store.dispatch(startAddGame({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_GAME',
            game: {
                id: expect.any(String),
                ...gameDefaults
            }
        });

        return database.ref(`games/${actions[0].game.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(gameDefaults);
        done();
    });
});

test('should setup set game action object with data', () => {
    const action = setGames(games);
    expect(action).toEqual({
        type: 'SET_GAMES',
        games
    });
});

test('should fetch the games from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetGames()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_GAMES',
            games
        });
        done();
    });
});
