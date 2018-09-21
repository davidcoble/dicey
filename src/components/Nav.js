import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export const Nav = ({
                        isAdmin
                    }) => (
    <div className='navDiv'>
        <nav className='navNav'>
            <Link className='nav__link' to='/table'>table</Link>
            <Link className='nav__link' to='/players'>players</Link>
            <Link className='nav__link' to='/games'>games</Link>

            { isAdmin ? (
                <Link className='nav__link' to='/'>aaaa</Link>

            ): (
                <Link className='nav__link' to='/'>bbbb</Link>

            )}

        </nav>
    </div>
);

const mapDispatchToProps = (dispatch) => ({

});
const mapStateToProps = (state) => {
    //console.log("Nav.mapStateToProps state = " + JSON.stringify(state, null, 2));
    return {
        isAdmin: !!state.auth.isAdmin
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);