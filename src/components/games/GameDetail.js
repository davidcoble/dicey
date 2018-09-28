import React from 'react';
import { Link } from 'react-router-dom';

const GameDetail = (game) => (
    <Link to={`/editGame/${game.id}`}>
        <div>
            <p>name: {name}</p>
        </div>
    </Link>
);

export default GameDetail;
