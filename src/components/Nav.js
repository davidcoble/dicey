import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export const Nav = ({
isAdmin
}) => (
    <div className='navDiv'>
        <nav className='navNav'>
            <Link className='nav__link' to='/players'>players</Link>
            { isAdmin ? (
                <Link className='nav__link' to='/'>aaa</Link>

            ): (
                <Link className='nav__link' to='/'>bbb</Link>

            )}

        </nav>
    </div>
);

const mapDispatchToProps = (dispatch) => ({

});
const mapStateToProps = (state) => ({
    isAdmin: !!state.auth.admin
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);