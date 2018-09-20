import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { startSaveUserPage } from '../actions/auth';

export const PrivateRoute = ({
                                 isAuthenticated,
                                 name,
                                 component: Component,
                                 path,
                                 startSaveUserPage,
                                 ...rest
                             }) => {
    console.log("path = " + path);
    startSaveUserPage(path);
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/" />
            )
        )} />
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    name: state.auth.name
});

const mapDispatchToProps = (dispatch) => ({
    startSaveUserPage: (path) => dispatch(startSaveUserPage(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
