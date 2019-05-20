import React from 'react';
import { Link } from 'react-router-dom';
import PlayerGameList from './PlayerGameList';

const PlayerDetail = (player) => (
    <div>
        <Link to={`/editPlayer/${player.uid}`}>{player.name}</Link>
        {/*<b> loggedIn: {player.loggedIn ? 'yes' : 'no'}*/}
        {/*    isAdmin: {player.isAdmin ? 'yes':'no'}*/}
        {/*    path: {player.path} uid: {player.uid}*/}
        {/*</b>*/}
        <br/>
        <b>Currently Playing:</b>
        <PlayerGameList key={player.uid} {...player}/>
    </div>
);

export default PlayerDetail;