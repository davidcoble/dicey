import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetPlayers} from "./actions/players";
import { startSetLoggedIn } from "./actions/auth";
import { startMakePlayerAdmin } from "./actions/players";
import { startSetExpenses } from "./actions/expenses";
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
        let auth = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAdmin: 'false'
        };
        store.dispatch(login(auth));
        store.dispatch(startSetLoggedIn())
            .then(() => {
                if(user.uid == 'dyMIEyrAb8T4PgLkIeVrpxLSPkE3') {
                    store.dispatch(startMakePlayerAdmin(user.uid, true));
                }
            })
            .then(store.dispatch(startSetPlayers()))
            .then(store.dispatch(startSetLoggedIn()))
            .then(store.dispatch(startSetExpenses()))
            .then(() => {
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
