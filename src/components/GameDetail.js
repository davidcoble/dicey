import React from 'react';
import { Link } from 'react-router-dom';

const GameDetail = ({uid, name, loggedIn, isAdmin, path}) => (
    <Link to={`/editGame/${uid}`}>
        <div>
            <p>name: {name} loggedIn: {loggedIn ? 'yes' : 'no'} isAdmin: {isAdmin ? 'yes':'no'} path: {path} uid: {uid}</p>
        </div>
    </Link>
);

export default GameDetail;
