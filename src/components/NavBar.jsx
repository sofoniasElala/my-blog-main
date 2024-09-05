import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { handleAuth } from '../utils';

export default function NavBar({ justLoggedIn, setJustLoggedIn }) {
    return (<div className='nav-links'>
    <NavLink to="/tags/film">Film</NavLink>
    <NavLink to="/tags/tech">Tech</NavLink>
    <NavLink to="/tags/fashion">Fashion</NavLink>
    <button className='log' onClick={ () =>   handleAuth(justLoggedIn, setJustLoggedIn, false)} >{localStorage.getItem('blog-user') ? 'Log out' : 'Log in'}</button>
    </div>)
}

NavBar.propTypes = {
    justLoggedIn: PropTypes.object,
    setJustLoggedIn: PropTypes.func
} 