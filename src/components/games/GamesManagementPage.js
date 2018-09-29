import React from 'react';
import GameList from './GameList';
import GamesSummary from './GamesSummary';

const GamesManagementPage = () => (
    <div>
        <GamesSummary />
        <GameList />
    </div>
);

export default GamesManagementPage;
