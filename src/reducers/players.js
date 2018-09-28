// players reducer

const playersReducerDefaultState = [];

export default (state = playersReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_PLAYERS':
          //console.log("SET_PLAYERS called");
          return action.players;
      case 'EDIT_PLAYER':
          //console.log("EDIT_PLAYER called action = " + JSON.stringify(action, null, 2));
          return state.map((player) => {
              if (player.uid === action.uid) {
                  return {
                      ...player,
                      ...action.updates
                  };
              } else {
                  return player;
              }
          });
      default:
          return state;
  }
};