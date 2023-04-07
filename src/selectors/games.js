import moment from 'moment';

// Get visible games
// this should be called selectGamesf
export const selectGames = (games, player) => {
    //console.log("games = " + JSON.stringify(games));
    // console.log("player = " + JSON.stringify(player, null, 2));
    let hideNotPlaying = player.hideNotPlaying ? true : false;
    let playerShowDeleted = player.showDeletedGames ? true : false;
    return games.filter((game) => {
        // console.log("filtering games game = " + JSON.stringify(game, null, 2));
        // console.log("game.deleted = " + game.deleted + " playerShowDeleted = " + playerShowDeleted);
        let deleted = game.deleted !== undefined && game.deleted;
        if (deleted === playerShowDeleted) {
            // console.log("continuing");
        } else {
            // console.log("returning false");
            return false;
        }
        if (hideNotPlaying) {
            return player && player.games !== undefined && player.games[game.id].in;
        } else {
            return true;
        }
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
// this should be called selectGames
export const selectPlayerGames = (games, playergames) => {
    //console.log("selectPlayerGames games = " + JSON.stringify(games));
    //console.log("selectPlayerGames playergames = " + JSON.stringify(playergames));
    if(playergames === undefined)
        return [];
    return games.filter((game) => {
        const gid = game.id;
        if (playergames[gid] && playergames[gid].in) {
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

