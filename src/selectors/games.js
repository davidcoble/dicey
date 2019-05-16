import moment from 'moment';

// Get visible games
// this should be called selectGamesf
export default (games, { name, sortBy, startDate, endDate }) => {
    //console.log("games = " + JSON.stringify(games));
    return games.filter((game) => {
        return true;
    }).sort((a, b) => {
        //console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        return a.name < b.name ? -1 : 1;
        // if (sortBy === 'name') {
        //     console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        //     return b.name < a.name ? -1 : 1;
        // } else if (sortBy === 'amount') {
        //     return a.amount < b.amount ? 1 : -1;
        // }
    });
};


// Get visible games
// this should be called selectGamesf
export const selectPlayerGames = (games, playergames) => {
    //console.log("selectPlayerGames games = " + JSON.stringify(games));
    //console.log("selectPlayerGames playergames = " + JSON.stringify(playergames));
    if(playergames === undefined)
        return [];
    return games.filter((game) => {
        const gid = game.id;
        if (playergames[gid]) {
            return true;
        }
        return false;
    }).sort((a, b) => {
        //console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        return a.name < b.name ? -1 : 1;
        // if (sortBy === 'name') {
        //     console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        //     return b.name < a.name ? -1 : 1;
        // } else if (sortBy === 'amount') {
        //     return a.amount < b.amount ? 1 : -1;
        // }
    });
};

{}