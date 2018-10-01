import React from 'react';
import { Link } from 'react-router-dom';

const GameDetail = (game) => {
    //console.log("GameDetail: game = " + JSON.stringify(game, null, 4));
    return (
        <div>
            <Link className="button-round" to={`/game/delete/${game.id}`}>-</Link>
            <Link to={`/game/edit/${game.id}`}>
                <b>{game.name} ({game.description}) created/updated by {game.createdBy}</b>
            </Link>
        </div>
    );
};

export default GameDetail;
