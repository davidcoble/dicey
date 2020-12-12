import { partyFavorCursor } from '../horizon/cursors';

export const setPartyFavors = (partyFavors) => ({
    type: 'SET_PARTY_FAVORS',
    partyFavors,
});

export const startSetPartyFavors = () => {
    return (dispatch, getState) => {
        partyFavorCursor
            .order('id')
            .watch()
            .subscribe(allItems => {
                    console.log("allItems = " + JSON.stringify(allItems, null, 2));
                    const partyFavors = [];
                    allItems.map(it => {
                        //console.log("it = " + JSON.stringify(it, null, 2));
                        partyFavors.push(it);
                    });
                    //console.log("about to set party favors: " + JSON.stringify(partyFavors, null, 2));
                    dispatch(setPartyFavors(partyFavors));
                },
                error => console.error(error));
    };
};

export const startEditPartyFavor = ({partyFavor} = {}) => {
    // console.log("uid = " + uid + " gid  = " + gid);
    return () => {
        partyFavorCursor.update(partyFavor);
    };
};
