import moment from 'moment';

// Get visible results
// this should be called selectResultsf
export const selectResults = (results) => {
    //console.log("results = " + JSON.stringify(results));
    if (results === undefined) {
        return [];
    }
    return results.filter((result) => {
        return true;
    });
};

// export const selectTurns = (results, result) => {
//     let turnList = [];
//     //console.log("selectTurns results = " + JSON.stringify(results, null, 2));
//     //console.log("selectTurns result = " + JSON.stringify(result, null, 2));
//     if (results !== undefined) {
//         results.filter((b1) => {
//             return b1.id === result.id
//         }).map((b) => {
//             if (b.turnList !== undefined) {
//                 b.turnList.split("\n").map((turn) => {
//                     turnList.push({value: turn, label: turn});
//                 });
//             }
//         });
//     }
//     return turnList;
// };


// Get visible results
// this should be called selectResultsf
export const selectBoxResults = (results, box) => {
    //console.log("selectPlayerResults results = " + JSON.stringify(results));
    //console.log("selectPlayerResults playerresults = " + JSON.stringify(playerresults));
    if (results === undefined)
        return [];
    let resultsOut = results.filter((result) => {
        let resultName = result.rollType;
        let boxName = box.name;
        let resultValid = result.boxes[box.id] !== undefined ? result.boxes[box.id].checked : false;
        // console.log("For result " + resultName + ", box " + boxName + " valid = " + resultValid);
        return resultValid;
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
    //console.log("resultsOut = " + JSON.stringify(resultsOut, null, 2));
    return resultsOut;
};

{ }