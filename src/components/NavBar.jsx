import { useState } from 'react';
import PropTypes from 'prop-types'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { handleAuth } from '../utils';
import bar from '/bars-solid.svg';
import xMark from '/xmark-solid.svg';

function handleLogClick(loggedIn, navigate, justLoggedIn, setJustLoggedIn, location){
   if(loggedIn) {handleAuth(justLoggedIn, setJustLoggedIn); navigate('/');}
   else navigate('/login', {state: {from: location}});
}
export default function NavBar({ justLoggedIn, setJustLoggedIn, isChecked, setIsChecked }) {
    const userIsLoggedIn = localStorage.getItem('blog-visitor') ? true : false;
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
        document.body.style.overflow = event.target.checked ? 'hidden' : 'auto';
      };

    return (<div className='nav-links'>
    <input type="checkbox" name="menu-expand" id="menu-expand" checked={isChecked} onChange={handleChange} />
    <label htmlFor='menu-expand' ><img width='22px' src={isChecked ? xMark : bar} alt="Expand menu bar button" /></label>
    <div className="menu-background"></div>
    <div className="menu">
        <div className="tag-pages">
            <NavLink onClick={() => setIsChecked(false)} to="/tags/film">Film</NavLink>
            <p>{'/'}</p>
            <NavLink onClick={() => setIsChecked(false)} to="/tags/tech">Tech</NavLink>
            <p>{'/'}</p>
            <NavLink onClick={() => setIsChecked(false)} to="/tags/fashion">Fashion</NavLink>
            <p>{'/'}</p>
            <NavLink onClick={() => setIsChecked(false)} to="/tags/other">Other</NavLink>
        </div>
        <hr />
        <button  onClick={ () =>  handleLogClick(userIsLoggedIn, navigate, justLoggedIn, setJustLoggedIn, location)} >{userIsLoggedIn ? 'Log Out' : 'Log In'}</button>
        {!userIsLoggedIn && <button onClick={() => navigate('/signup')} className='SignUp'>Sign Up</button>}
    </div>
    </div>)
}

NavBar.propTypes = {
    justLoggedIn: PropTypes.object,
    setJustLoggedIn: PropTypes.func
} 