// players reducer

const playersReducerDefaultState = [];

export default (state = playersReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_PLAYERS':
          console.log("SET_PLAYERS called");
          return action.players;
      default:
          return state;
  }
};