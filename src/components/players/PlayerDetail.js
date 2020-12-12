import React from 'react';
import { Link } from 'react-router-dom';
import PlayerGameList from './PlayerGameList';

const PlayerDetail = (player) => (
    <div>
        <Link to={`/editPlayer/${player.id}`}>{player.name}</Link>
        {/*<b> loggedIn: {player.loggedIn ? 'yes' : 'no'}*/}
        {/*    isAdmin: {player.isAdmin ? 'yes':'no'}*/}
        {/*    path: {player.path} pid: {player.pid}*/}
        {/*</b>*/}
        {/*<pre>{JSON.stringify(player, null, 2)}</pre>*/}
        <b>Currently Playing:</b>
        <PlayerGameList key={player.id} {...player}/>
    </div>
);

export default PlayerDetail;