
// Get visible channels

export default (channels, { member }) => {
    //console.log("channel = " + JSON.stringify(channel));
    console.log("channel member = " + member);

    return channels.filter((channel) => {
        return true;
    }).sort((a, b) => {
        //console.log("comparing a to b " + JSON.stringify(a) + " " + JSON.stringify(b));
        return a.name < b.name ? -1 : 1;
    });
};
