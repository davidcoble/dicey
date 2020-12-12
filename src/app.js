import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetPartyFavors} from "./actions/partyFavors";
import { startSetPlayers} from "./actions/players";
import { startSetLoggedIn } from "./actions/auth";
import { startMakePlayerAdmin } from "./actions/players";
import { startSetBoxes } from "./actions/boxes";
import { startSetRolls } from "./actions/rolls";
import { startSetGames } from "./actions/games";
import { login, logout, setPartyFavor } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    // console.log("onAuthStateChanged user = " + JSON.stringify(user, null, 2));
    if (user) {
        let auth = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAdmin: 'false'
        };
        // new Promise((pass) => {
        store.dispatch(startSetPlayers());
        store.dispatch(startSetBoxes());
        store.dispatch(startSetRolls());
        store.dispatch(startSetGames());
        store.dispatch(startSetLoggedIn());
        // return pass;
        // })
        //     .then((pass) => {
        // console.log("onAuthStateChanged auth = " + JSON.stringify(auth, null, 2));
        store.dispatch(login(auth));
        //     return pass;
        // })
        // .then(
        renderApp();
        // )
        // .then(() => {
        if (history.location.pathname === '/') {
            console.log("navigating to /players");
            history.push('/players');
        }
        //         }
        //     }
        // )
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
