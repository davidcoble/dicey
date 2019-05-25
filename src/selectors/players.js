import moment from 'moment';

// Get visible games
// this should be called selectGamesf
export const selectGamePlayers = (players, gamers) => {
    //console.log("selectGamePlayers players = " + JSON.stringify(players));
    //console.log("selectGamePlayers gamers = " + JSON.stringify(gamers));
    if(gamers === undefined)
        return [];
    return players.filter((player) => {
        const pid = player.uid;
        if (gamers[pid]) {
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