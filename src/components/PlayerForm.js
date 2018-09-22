import React from 'react';
import moment from 'moment';

export default class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
        console.log("PlayerForm ctor props = " + JSON.stringify(props, null, 2));
        this.state = {
            name: props.player ? props.player.name : '',
            isAdmin: props.player ? props.player.isAdmin : '',
            isLoggedIn: props.player ? props.player.isLoggedIn : '',
            path: props.player ? props.player.path : '',
            email: props.player ? props.player.email : '',
            photoURL: props.player ? props.player.photoURL : '',
            error: ''
        };
    }
    onAdminChange = (e) => {
        const isAdmin = e.target.checked;
        console.log("isAdmin set to " + isAdmin);
        this.setState(() => ({ isAdmin }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.setState(() => ({ error: '' }));
        this.props.onSubmit({
            isAdmin: this.state.isAdmin
        });
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div>Name: {this.state.name}</div>
                <div>Name: {this.state.email}</div>
                <div><img src={this.state.photoURL} width='20px' height='20px'/></div>
                <div>Logged In: {this.state.isLoggedIn ? 'Yes' : 'No'}</div>
                <div>path = {this.state.path}</div>
                <div>Is Admin: <input
                    type='checkbox'
                    checked={this.state.isAdmin}
                    onChange={this.onAdminChange}
                /></div>
                <div>
                    <button className="button">Save Player</button>
                </div>
            </form>
        )
    }
}

