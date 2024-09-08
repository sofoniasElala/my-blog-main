import PropTypes from 'prop-types'
import { NavLink, useNavigate } from 'react-router-dom';
import { handleAuth } from '../utils';

export default function NavBar({ justLoggedIn, setJustLoggedIn }) {
    const userIsLoggedIn = localStorage.getItem('blog-user') ? true : false;
    const navigate = useNavigate();

    return (<div className='nav-links'>
    <NavLink to="/tags/film">Film</NavLink>
    <NavLink to="/tags/tech">Tech</NavLink>
    <NavLink to="/tags/fashion">Fashion</NavLink>
    <button  onClick={ () =>   {userIsLoggedIn ? handleAuth(justLoggedIn, setJustLoggedIn) : navigate('/login') }} >{userIsLoggedIn ? 'Log Out' : 'Log In'}</button>
    {!userIsLoggedIn && <button onClick={() => navigate('/signup')} className='SignUp'>Sign Up</button>}
    </div>)
}

NavBar.propTypes = {
    justLoggedIn: PropTypes.object,
    setJustLoggedIn: PropTypes.func
} 