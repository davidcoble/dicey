import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { startSetPlayers} from "./actions/players";
import { startSetLoggedIn } from "./actions/auth";
import { startMakePlayerAdmin } from "./actions/players";
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
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
    if (user) {
        console.log("user = " + JSON.stringify(user, null, 4));
        console.log("user's uid = " + user.uid);
        console.log("user's name = " + user.displayName);
        console.log("user's email = " + user.email);
        console.log("user's photoURL = " + user.photoURL);
        store.dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        store.dispatch(startSetLoggedIn()).then(() => {
            if(user.uid == 'dyMIEyrAb8T4PgLkIeVrpxLSPkE3') {
                console.log("welcome, admin");
                store.dispatch(startMakePlayerAdmin(user.uid, true));

            }
            console.log("personal information updated.");
        }).then(store.dispatch(startSetPlayers()));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        console.log("logged out");
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});
