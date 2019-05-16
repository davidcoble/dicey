import React from 'react';
import { Link } from 'react-router-dom';



const BoxDetail = (arg) => {
    //console.log("BoxDetail: arg = " + JSON.stringify(arg, null, 4));
    const ref = arg.props;
    const uid = ref.uid;
    //console.log("BoxDetail: uid = " + uid);
    return (
        <div>
            <Link className="button-round" to={`/box/delete/${ref.id}`}>-</Link>
            <Link to={`/box/edit/${ref.id}`}>
                <b>{ref.name} ({ref.description}) </b>
            </Link>
        </div>
    );
};

export default BoxDetail;
