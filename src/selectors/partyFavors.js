import moment from 'moment';

export const selectPartyFavors = (partyFavors) => {
    if (partyFavors === undefined) {
        return [];
    }
    return partyFavors.filter( (partyFavor) => {
        return partyFavor.uuid !== undefined && partyFavor.uuid !== '';
    });
};
