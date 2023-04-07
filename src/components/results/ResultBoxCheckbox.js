import React from 'react';
import { connect } from 'react-redux';
import ResultDetail from './ResultDetail';
import { selectResults } from '../../selectors/results';
import { Link } from "react-router-dom";

const ResultBoxCheckbox = (props) => {
    // console.log("ResultBoxCheckbox props = " + JSON.stringify(props));
    const uid = props.uid;
    const checked = props.box.checked ? 'checked' : '';
    return (
        <div>
            <div>
                <input type='checkbox'
                    id={props.box.id}
                    onChange={props.onBoxSelectionChange}
                    checked={props.box.checked}

                />
                {props.box.name}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    //console.log("mapStateToProps state = " + JSON.stringify(state, null, 2));
    return {
        results: selectResults(state.results),
        uid: state.auth.uid
    };
};

export default connect(mapStateToProps)(ResultBoxCheckbox);
