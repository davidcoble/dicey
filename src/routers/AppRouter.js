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
import { gameNavList } from '../components/games/GameNavList';

export const history = createHistory();

const AppRouter = ({ startSaveUserPage }) => {
    let path = window.location.href;
    startSaveUserPage(path);
    // console.log("about to useEffect");
    useEffect(() => {
        let shifted = false;
        const handleKeyUp = (e) => {
            const key = e.key;
            console.log("key up = " + key);
            if (key === 'Shift') {
                shifted = false;
            }
        }


        const handleKeyDown = (e) => {
            // console.log("key down = " + key);
            let path = window.location.href;
            // console.log("path = " + path);
            // e.preventDefault();
            const key = e.key;
            // console.log("e.keys = " + Object.keys(e));

            let newIndex = 0;
            if (key === 'Shift') {
                shifted = true;
            }
            if (key === 'Tab') {
                console.log("That's a tab!");
                for (var i = 0; i < gameNavList.length; i++) {
                    // console.log(`gameNavList[${i}] = ${JSON.stringify(gameNavList[i])}`)
                    if (path.endsWith(gameNavList[i].path)) {
                        // console.log("current index = " + i);
                        newIndex = i;
                    }
                }
                // console.log("newIndex = " + newIndex);
                // console.log("gameNavList.length = " + gameNavList.length);
                if (shifted) {
                    newIndex--;
                } else {
                    newIndex++;
                }
                if (newIndex >= gameNavList.length) {
                    newIndex = 0;
                }
                if (newIndex < 0)
                    newIndex = gameNavList.length - 1;
                // console.log("newIndex = " + newIndex);
                // console.log("new path = " + gameNavList[newIndex].path);
                startSaveUserPage(gameNavList[newIndex].path);
                history.push(gameNavList[newIndex].path)
            }
        }

        document.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('keyup', handleKeyUp, true);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };

    }, []);

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
    startSaveUserPage: (path) => dispatch(startSaveUserPage(path))
});

export default connect(undefined, mapDispatchToProps)(AppRouter);
