import React from 'react';
import { connect } from 'react-redux';
import ResultDetail from './ResultDetail';
import { selectResults } from '../../selectors/results';
import {Link} from "react-router-dom";

const ResultOutcomes = (props) => {
    //console.log("ResultList props = " + JSON.stringify(props));
    const uid = props.uid;
    return (
        <div>
            <Link className="button-round" to="/results/create">+</Link>
            <b>Roll Types</b>
            <div>
                {
                    props.results.length === 0 ? (
                        <div>No Roll Types Defined</div>
                    ) : (
                        props.results.map((result) => {
                            return (
                                <ResultDetail key={result.id} {...result} />
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
        results: selectResults(state.results),
        uid: state.auth.uid
    };
};

export default connect(mapStateToProps)(ResultList);
