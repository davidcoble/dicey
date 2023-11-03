import React from 'react';
import ResultList from './ResultList';
import ResultForm from './ResultForm';
import { startAddResult, startEditResult, startRemoveResult } from "../../actions/results";
import { connect } from "react-redux";


export class ResultManagementPage extends React.Component {

    onSubmitAddResult = (result) => {
        this.props.startAddResult(result);
        //this.props.history.push('/results');
    };

    onSubmitEditResult = (result) => {
        this.props.startEditResult(this.props.result.id, result);
        this.props.history.push('/results');
    };
    onRemoveResult = () => {
        this.props.startRemoveResult({ id: this.props.result.id });
        this.props.history.push("/results");
    };
    componentDidMount() {
        if (this.props.match.path.startsWith('/results/delete')) {
            //this.props.onSubmit();
            this.onRemoveResult();
        }
    };


    render() {
        // console.log("render with props = " + JSON.stringify(this.props, null, 2));
        if (this.props.location.pathname.startsWith('/results/create')) {
            let tval = this.onSubmitAddResult(
                {
                    rollType: "combat",
                    dice: 1,
                    sides: 6,
                    outcomes: [
                        { rolled: 1 },
                        { rolled: 2 },
                        { rolled: 3 },
                        { rolled: 4 },
                        { rolled: 5 },
                        { rolled: 6 },
                    ],
                    boxes: { fakeId: { checked: false } }
                }
            );
            console.log("tval = " + tval);
            return null;
            // return (
            //     <div>
            //         <div className="page-header">
            //             <div className="content-container">
            //                 <h1 className="page-header__title">Add Game Result</h1>
            //             </div>
            //         </div>
            //         <div className="content-container">
            //             <ResultForm onSubmit={this.onSubmitAddResult} />
            //         </div>
            //     </div>
            // );
        }
        else if (this.props.match.path.startsWith('/results/edit')) {
            //            console.log("props = " + JSON.stringify(this.props, null,2));
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Editing result {this.props.result.rollType}</h1>
                        </div>
                    </div>
                    <div className="result-content-container">
                        <ResultForm history={this.props.history} result={this.props.result} onSubmit={this.onSubmitEditResult} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ResultList />
                </div>
            );
        }
    }
};

const mapStateToProps = (state, props) => {
    // console.log("state.results = " + JSON.stringify(state.results, null, 2));
    return {
        result: state.results.find((result) => result.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddResult: (result) => dispatch(startAddResult(result)),
    startEditResult: (id, result) => dispatch(startEditResult(id, result)),
    startRemoveResult: (id) => dispatch(startRemoveResult(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultManagementPage);
