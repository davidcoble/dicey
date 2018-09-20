import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { startSetPlayers} from "./actions/players";
import { startSetLoggedIn } from "./actions/auth";
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
        //console.log("user = " + JSON.stringify(user, null, 4));
        console.log("user's name = " + user.providerData[0].displayName);
        store.dispatch(login(user.uid, user.providerData[0].displayName));
        store.dispatch(startSetLoggedIn()).then(() => {
            if(user.uid == 'dyMIEyrAb8T4PgLkIeVrpxLSPkE3') {
                console.log("welcome, admin");
                store.getState().auth.admin=true;
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
