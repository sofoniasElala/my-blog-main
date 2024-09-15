import PropTypes from 'prop-types'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { handleAuth } from '../utils';

function handleLogClick(loggedIn, navigate, justLoggedIn, setJustLoggedIn, location){
   if(loggedIn) {handleAuth(justLoggedIn, setJustLoggedIn); navigate('/');}
   else navigate('/login', {state: {from: location}});
}
export default function NavBar({ justLoggedIn, setJustLoggedIn }) {
    const userIsLoggedIn = localStorage.getItem('blog-visitor') ? true : false;
    const navigate = useNavigate();
    const location = useLocation();

    return (<div className='nav-links'>
    <NavLink to="/tags/film">Film</NavLink>
    <NavLink to="/tags/tech">Tech</NavLink>
    <NavLink to="/tags/fashion">Fashion</NavLink>
    <button  onClick={ () =>  handleLogClick(userIsLoggedIn, navigate, justLoggedIn, setJustLoggedIn, location)} >{userIsLoggedIn ? 'Log Out' : 'Log In'}</button>
    {!userIsLoggedIn && <button onClick={() => navigate('/signup')} className='SignUp'>Sign Up</button>}
    </div>)
}

NavBar.propTypes = {
    justLoggedIn: PropTypes.object,
    setJustLoggedIn: PropTypes.func
} 