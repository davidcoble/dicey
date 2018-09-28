export default (games) => {
  return games
      .map((game) => game.amount)
      .reduce((sum, value) => sum + value, 0);
};
