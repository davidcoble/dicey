import React from 'react';
import BoxList from './BoxList';
import BoxForm from './BoxForm';
import {startAddBox, startEditBox, startRemoveBox} from "../../actions/boxes";
import {connect} from "react-redux";

export class BoxManagementPage extends React.Component {

    onSubmitAddBox = (box) => {
        this.props.startAddBox(box);
        this.props.history.push('/boxes');
    };

    onSubmitEditBox = (box) => {
        this.props.startEditBox(this.props.box.id, box);
        this.props.history.push('/boxes');
    };
    onRemoveBox = () => {
        this.props.startRemoveBox({id: this.props.box.id});
        this.props.history.push("/boxes");
    };
    componentWillMount() {
        if (this.props.match.path.startsWith('/boxes/delete')) {
            this.onRemoveBox();
        }
    };

    render() {
        // console.log("render with props = " + JSON.stringify(this.props, null, 2));
        if (this.props.location.pathname.startsWith('/boxes/create')) {
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Add Game Box</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <BoxForm onSubmit={this.onSubmitAddBox} />
                    </div>
                </div>
            );
        }
        else if (this.props.match.path.startsWith('/boxes/edit')) {
//            console.log("props = " + JSON.stringify(this.props, null,2));
            return (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Editing box {this.props.box.name}</h1>
                        </div>
                    </div>
                    <div className="box-content-container">
                        <BoxForm box={this.props.box} onSubmit={this.onSubmitEditBox} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <BoxList />
                </div>
            );
        }
    }
};

const mapStateToProps = (state, props) => {
    // console.log("state.boxes = " + JSON.stringify(state.boxes, null, 2));
    return {
        box: state.boxes.find((box) => box.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddBox: (box) => dispatch(startAddBox(box)),
    startEditBox: (id, box) => dispatch(startEditBox(id, box)),
    startRemoveBox: (id) => dispatch(startRemoveBox(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BoxManagementPage);
