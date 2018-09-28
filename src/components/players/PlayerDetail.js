import React from 'react';
import { Link } from 'react-router-dom';

const PlayerDetail = ({uid, name, loggedIn, isAdmin, path}) => (
    <Link to={`/editPlayer/${uid}`}>
        <div>
            <p>name: {name} loggedIn: {loggedIn ? 'yes' : 'no'} isAdmin: {isAdmin ? 'yes':'no'} path: {path} uid: {uid}</p>
        </div>
    </Link>
);

export default PlayerDetail;