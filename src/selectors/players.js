import moment from 'moment';

// Get visible games
// this should be called selectGamesf
export const selectGamePlayers = (players, gamers) => {
    // console.log("selectGamePlayers players = " + JSON.stringify(players, null, 2));
    // console.log("selectGamePlayers gamers = " + JSON.stringify(gamers));
    if(gamers === undefined)
        return [];
    const roll_players = players.filter((player) => {
        const pid = player.uid;
        if (gamers[pid]) {
            console.log("playerid " + pid + " true");
            return true;
        } else {
            console.log("playerid " + pid + " false");
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
    // console.log("roll_players = " + JSON.stringify(roll_players, null, 2));
    return roll_players;
};

export const selectGameSubscribers = (players, subscribers) => {
    if (subscribers === undefined) {
        return [];
    }
    return players.filter((p) => {
        const pid = p.uid;
        if (subscribers[pid]) {
            return true;
        }
        return false;
    });
}

{}