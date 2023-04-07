import React from 'react';
import { Link } from 'react-router-dom';



const ResultDetail = (ref) => {
    //    console.log("TurnDetail: ref = " + JSON.stringify(ref, null, 4));
    let min = ref.dice;
    let max = ref.dice * ref.sides;
    return (
        <div>
            <Link className="button-round" to={`/results/delete/${ref.id}`}>-</Link>
            <Link to={`/results/edit/${ref.id}`}>
                <b>{ref.rollType} ({min} - {max})</b>
            </Link>
            &nbsp;
            <Link to={`/results/edit/${ref.id}`}>
                <b>outcomes</b>
            </Link>
        </div>
    );
};

export default ResultDetail;
