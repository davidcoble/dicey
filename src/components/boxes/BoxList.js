import React from 'react';
import { connect } from 'react-redux';
import BoxDetail from './BoxDetail';
import { selectBoxes } from '../../selectors/boxes';
import {Link} from "react-router-dom";

const BoxList = (props) => {
    //console.log("BoxList props = " + JSON.stringify(props));
    return (
        <div>
            <Link className="button-round" to="/boxes/create">+</Link>
            <b>Boxes</b>
            <div>
                {
                    props.boxes.length === 0 ? (
                        <div>No Boxes</div>
                    ) : (
                        props.boxes.map((box) => {
                            return (
                                <BoxDetail key={box.id} {...box} />
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    //console.log("mapStateToProps state = " + JSON.stringify(state, null, 2));
    return {
        boxes: selectBoxes(state.boxes),
        pid: state.auth.pid,
    };
};

export default connect(mapStateToProps)(BoxList);
