import React from 'react';
import BoxList from './BoxList';
import BoxForm from './BoxForm';

export class BoxManagementPage extends React.Component {

    onSubmitAddBox = (box) => {
        this.props.startAddBox(box);
        this.props.history.push('/boxes');
    };

    render() {
        if (props.match.path === '/box/create') {
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
        else {
            return (
                <div>
                    <BoxList />
                </div>
            )
        }
    }
};

export default BoxManagementPage;
