import React from 'react';
import { Link } from 'react-router-dom';



const RollDetail = (ref) => {
//    console.log("TurnDetail: ref = " + JSON.stringify(ref, null, 4));
    return (
        <div>
            <Link className="button-round" to={`/boxes/delete/${ref.id}`}>-</Link>
            <Link to={`/boxes/edit/${ref.id}`}>
                <b>{ref.name} ({ref.description}) </b>
            </Link>
        </div>
    );
};

export default RollDetail;
