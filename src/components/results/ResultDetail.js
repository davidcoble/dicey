import React from 'react';
import { Link } from 'react-router-dom';



const ResultDetail = (ref) => {
//    console.log("TurnDetail: ref = " + JSON.stringify(ref, null, 4));
    return (
        <div>
            <Link className="button-round" to={`/results/delete/${ref.id}`}>-</Link>
            <Link to={`/results/edit/${ref.id}`}>
                <b>{ref.name} ({ref.description}) </b>
            </Link>
        </div>
    );
};

export default ResultDetail;
