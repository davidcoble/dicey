import React from 'react';
import { connect } from 'react-redux';
import TurnDetail from './TurnDetail';
import { selectTurns } from '../../selectors/turns';
import {Link} from "react-router-dom";

const TurnList = (props) => {
    //console.log("TurnList props = " + JSON.stringify(props));
    const uid = props.uid;
    return (
        <div>
            <Link className="button-round" to="/turns/create">+</Link>
            <b>Turns</b>
            <div>
                {
                    props.turns.length === 0 ? (
                        <div>No Turns</div>
                    ) : (
                        props.turns.map((turn) => {
                            return (
                                <TurnDetail key={turn.id} {...turn} />
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
        turns: selectTurns(state.turns),
        uid: state.auth.uid
    };
};

export default connect(mapStateToProps)(TurnList);
