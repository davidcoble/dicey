import React, { useEffect } from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import BoxManagementPage from '../components/boxes/BoxManagementPage';
import ResultManagementPage from '../components/results/ResultManagementPage';
import ContactForm from '../components/EmailClient';
import GameAddPage from '../components/games/GameAddPage';
import GameEditPage from '../components/games/GameEditPage';
import GameDeletePage from '../components/games/GameDeletePage';
import GamePlayerAddPage from '../components/games/GamePlayerAddPage';
import GamePlayerRemovePage from '../components/games/GamePlayerRemovePage';
import GameSubscriberAddPage from '../components/games/GameSubscriberAddPage';
import GameSubscriberRemovePage from '../components/games/GameSubscriberRemovePage';
import GamesManagementPage from '../components/games/GamesManagementPage';
import GameUndeletePage from "../components/games/GameUndeletePage";
import PlayerManagementPage from '../components/players/PlayerManagementPage';
import RollManagementPage from '../components/rolls/RollManagementPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startSaveUserPage } from '../actions/auth';
import connect from "react-redux/es/connect/connect";
import MapPage from '../components/maps/MapPage';
import Forcepool from '../components/forcepools/Forcepool';
import { keystrokeClearinghouse } from '../components/utils/KeystrokeClearinghouse';


export const history = createHistory();

const AppRouter = ({ startSaveUserPage }) => {
// const AppRouter = ({}) => {
    let path = window.location.href;
    console.log("path = " + path)
    startSaveUserPage(path);
    // console.log("about to useEffect");
    useEffect(keystrokeClearinghouse, []);
    
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute path="/" component={LoginPage} exact={true} />
                    <PrivateRoute path="/boxes/edit/:id" component={BoxManagementPage} />
                    <PrivateRoute path="/boxes/delete/:id" component={BoxManagementPage} />
                    <PrivateRoute path="/boxes" component={BoxManagementPage} />
                    <PrivateRoute path="/email" component={ContactForm} />
                    <PrivateRoute path="/forcepool/:power" component={Forcepool} />
                    <PrivateRoute path="/games" component={GamesManagementPage} />
                    <PrivateRoute path="/game/create" component={GameAddPage} />
                    <PrivateRoute path="/game/edit/:id" component={GameEditPage} />
                    <PrivateRoute path="/game/delete/:id" component={GameDeletePage} />
                    <PrivateRoute path="/game/undelete/:id" component={GameUndeletePage} />
                    <PrivateRoute path="/game/:gid/player/:pid/add" component={GamePlayerAddPage} />
                    <PrivateRoute path="/game/:gid/player/:pid/remove" component={GamePlayerRemovePage} />
                    <PrivateRoute path="/game/:gid/subscriber/:pid/subscribe" component={GameSubscriberAddPage} />
                    <PrivateRoute path="/game/:gid/subscriber/:pid/unsubscribe" component={GameSubscriberRemovePage} />
                    <PrivateRoute path="/maps/:gid" component={MapPage} />
                    <PrivateRoute path="/maps" component={MapPage} />
                    <PrivateRoute path="/players" component={PlayerManagementPage} />
                    <PrivateRoute path="/results" component={ResultManagementPage} />
                    <PrivateRoute path="/results/delete/:id" component={ResultManagementPage} />
                    <PrivateRoute path="/results/edit/:id" component={ResultManagementPage} />
                    <PrivateRoute path="/rolls/:gid" component={RollManagementPage} />
                    <PrivateRoute path="/rolls/" component={RollManagementPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startSaveUserPage: (path) => dispatch(startSaveUserPage(path)),
});

export default connect(undefined, mapDispatchToProps)(AppRouter);
