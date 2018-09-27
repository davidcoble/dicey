import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export const Nav = (props) => (
    <div className='navDiv'>
        <nav className='navNav'>
            <Link className='nav__link' to='/table'>table</Link>
            <Link className='nav__link' to='/players'>players</Link>
            <Link className='nav__link' to='/games'>games</Link>

            { props.auth.isAdmin === 'true' ? (
                <Link className='nav__link' to='/'>aaaa {props.auth.name}</Link>

            ): (
                <Link className='nav__link' to='/'>bbbb {props.auth.name}</Link>

            )}

        </nav>
    </div>
);

const mapDispatchToProps = (dispatch) => ({

});
const mapStateToProps = (state) => {
    console.log("Nav.mapStateToProps state = " + JSON.stringify(state, null, 2));
    let isAdmin = (JSON.stringify(state.auth.isAdmin) === 'true');
    console.log("Nav.mapStateToProps isAdmin = " + isAdmin);
    let name = state.auth.name;
    console.log("Nav.mapStateToProps name = " + name);
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);