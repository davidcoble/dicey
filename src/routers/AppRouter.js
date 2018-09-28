import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import PlayerEditPage from '../components/players/PlayerEditPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PlayerManagementPage from '../components/players/PlayerManagementPage';
import GamesManagementPage from '../components/games/GamesManagementPage';
import TableExamplePage from '../components/TableExamplePage';
import { startSaveUserPage } from '../actions/auth';
import connect from "react-redux/es/connect/connect";

export const history = createHistory();

const AppRouter = ({startSaveUserPage}) => {
    let path = window.location.href;
    console.log("path = " + path);
    startSaveUserPage(path);
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true}/>
                    <PrivateRoute path="/players" component={PlayerManagementPage}/>
                    <PrivateRoute path="/games" component={GamesManagementPage}/>
                    <PrivateRoute path="/table" component={TableExamplePage}/>
                    <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
                    <PrivateRoute path="/create" component={AddExpensePage}/>
                    <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                    <PrivateRoute path="/editPlayer/:id" component={PlayerEditPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </Router>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startSaveUserPage: (path) => dispatch(startSaveUserPage(path))
});

export default connect(undefined, mapDispatchToProps)(AppRouter);
