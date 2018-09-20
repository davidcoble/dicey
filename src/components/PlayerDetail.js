import React from 'react';
import { Link } from 'react-router-dom';

const PlayerDetail = ({uid, name, loggedIn, path}) => (
    <div>
        <p>name: {name} loggedIn: {loggedIn} path: {path} uid: {uid}</p>
    </div>
);

export default PlayerDetail;