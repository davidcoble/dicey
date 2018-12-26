import React from 'react';
import ExpenseList from './GameList';
import ExpenseListFilters from './GameListFilters';
import ExpensesSummary from './GamesSummary';

const GameDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default GameDashboardPage;
