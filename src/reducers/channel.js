// Channels Reducer

const channelsReducerDefaultState = [];

export const channelReducer = (state = channelsReducerDefaultState, action) => {
    //console.log("reducer action = " + JSON.stringify(action));
    switch (action.type) {
        case 'ADD_CHANNEL':
            return [
                ...state,
                action.channel
            ];
        case 'REMOVE_CHANNEL':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_CHANNEL':
            return state.map((channel) => {
                if (channel.id === action.id) {
                    return {
                        ...channel,
                        ...action.updates
                    };
                } else {
                    return channel;
                }
            });
        case 'SET_CHANNELS':
            return action.channels;
        default:
            return state;
    }
};

const channelsFilterDefaultState = {
    member: ''
};

export const channelFilter = (state = channelsFilterDefaultState, action) => {
    switch (action.type) {
        case 'SET_MEMBER':
            return {
                ...state,
                member: action.member
            }
        default:
            return state;
    }


}
