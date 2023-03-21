import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const Nav = (props) => {
    // console.log("Nav props = " + JSON.stringify(props, null, 2));
    // props.auth.isAdmin && console.log("Bingo!");
    return (
        <div className='navDiv'>
            <nav className='navNav'>
                <NavLink activeClassName="selected" className='nav__link' to='/players'>players</NavLink>
                <NavLink activeClassName="selected" className='nav__link' to='/games'>games</NavLink>
                <NavLink activeClassName="selected" className='nav__link' to='/rolls'>rolls</NavLink>
                {
                    !!props.auth.isAdmin ?
                    (<NavLink activeClassName="selected" className='nav__link' to='/boxes'>boxes</NavLink>
                    ) : (<a className='nav__link'>boxes</a>)
                }
                {
                    !!props.auth.isAdmin ?
                    (<NavLink activeClassName="selected" className='nav__link' to='/results'>results</NavLink>
                    ) : (<a className='nav__link'>results</a>)
                }
                <a className='nav__link' href='https://github.com/davidcoble/dicey/issues'>suggestions</a>
                {/*{ props.auth.isAdmin === 'true' ? (*/}
                {/*    <Link className='nav__link' to='/'>admin {props.auth.name}</Link>*/}
                {/*): (*/}
                {/*    <Link className='nav__link' to='/'>{props.auth.name}</Link>*/}
                {/*)}*/}

            </nav>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({

});
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
