import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ChannelAddPage from '../components/channel/ChannelAddPage';
import ChannelEditPage from '../components/channel/ChannelEditPage';
import ChannelDeletePage from '../components/channel/ChannelDeletePage';
import ChannelViewPage from '../components/channel/ChannelViewPage';
import ChannelManagementPage from '../components/channel/ChannelManagementPage';
import ChatAddPage from '../components/chat/ChatAddPage';
import ChatEditPage from '../components/chat/ChatEditPage';
import ChatDeletePage from '../components/chat/ChatDeletePage';
import ChatManagementPage from '../components/chat/ChatManagementPage';
import GameAddPage from '../components/games/GameAddPage';
import GameEditPage from '../components/games/GameEditPage';
import GameDeletePage from '../components/games/GameDeletePage';
import GamePlayerAddPage from '../components/games/GamePlayerAddPage';
import GamePlayerRemovePage from '../components/games/GamePlayerRemovePage';
import GamesManagementPage from '../components/games/GamesManagementPage';
import PlayerEditPage from '../components/players/PlayerEditPage';
import PlayerManagementPage from '../components/players/PlayerManagementPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import TableExamplePage from '../components/TableExamplePage';
import { startSaveUserPage } from '../actions/auth';
import connect from "react-redux/es/connect/connect";

export const history = createHistory();

const AppRouter = ({startSaveUserPage}) => {
    let path = window.location.href;
    //console.log("path = " + path);
    startSaveUserPage(path);
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true}/>
                    <PrivateRoute path="/players" component={PlayerManagementPage}/>
                    <PrivateRoute path="/channels" component={ChannelManagementPage}/>
                    <PrivateRoute path="/channel/create" component={ChannelAddPage}/>
                    <PrivateRoute path="/channel/edit/:id" component={ChannelEditPage}/>
                    <PrivateRoute path="/channel/delete/:id" component={ChannelDeletePage}/>
                    <PrivateRoute path="/channel/view/:id" component={ChannelViewPage}/>
                    <PrivateRoute path="/chats" component={ChatManagementPage}/>
                    <PrivateRoute path="/chat/create" component={ChatAddPage}/>
                    <PrivateRoute path="/chat/edit/:id" component={ChatEditPage}/>
                    <PrivateRoute path="/chat/delete/:id" component={ChatDeletePage}/>
                    <PrivateRoute path="/games" component={GamesManagementPage}/>
                    <PrivateRoute path="/game/create" component={GameAddPage}/>
                    <PrivateRoute path="/game/edit/:id" component={GameEditPage}/>
                    <PrivateRoute path="/game/delete/:id" component={GameDeletePage}/>
                    <PrivateRoute path="/game/:gid/player/:pid/add" component={GamePlayerAddPage}/>
                    <PrivateRoute path="/game/:gid/player/:pid/remove" component={GamePlayerRemovePage}/>
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
