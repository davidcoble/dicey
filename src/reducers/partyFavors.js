// party favors reducer

const partyFavorReducerDefaultState = [];

export const partyFavorReducer = (state = partyFavorReducerDefaultState, action) => {
  switch (action.type) {
      case 'SET_PARTY_FAVORS':
          //console.log("SET_PLAYERS called");
          return action.partyFavors;
      default:
          return state;
  }
};