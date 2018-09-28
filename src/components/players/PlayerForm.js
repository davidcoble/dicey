import React from 'react';
import moment from 'moment';

export default class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
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
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div>Name: {this.state.name}</div>
                        </td>
                        <td>
                            <div>Name: {this.state.email}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div><img src={this.state.photoURL} width='20px' height='20px'/></div>
                        </td>
                        <td>
                            <div>Logged In: {this.state.isLoggedIn ? 'Yes' : 'No'}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>path = {this.state.path}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Is Admin: <input
                                type='checkbox'
                                checked={this.state.isAdmin}
                                onChange={this.onAdminChange}
                            /></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <button className="button">Save Player</button>
                </div>
            </form>
        )
    }
}

