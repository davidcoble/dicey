// players reducer

const playersReducerDefaultState = [];

export default (state = playersReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_PLAYERS':
          return action.players;
      default:
          return state;
  }
};