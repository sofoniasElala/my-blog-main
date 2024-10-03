import { useRef } from 'react';
import PropTypes, { element } from 'prop-types'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { handleAuth } from '../utils';
import bar from '/bars-solid.svg';
import xMark from '/xmark-solid.svg';

export default function NavBar({ justLoggedIn, setJustLoggedIn, isChecked, setIsChecked }) {
    const userIsLoggedIn = localStorage.getItem('blog-visitor') ? true : false;
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef = useRef(null);

    const handleLogClick = (loggedIn, navigate, justLoggedIn, setJustLoggedIn, location) => {
       if (inputRef.current) updateCheckedStatus(inputRef.current.checked, true);
       if(loggedIn) {handleAuth(justLoggedIn, setJustLoggedIn); navigate('/');}
       else navigate('/login', {state: {from: location}});
    }
    
    const updateCheckedStatus = (checked, accountRelated = false) => {
        if(checked){
           setIsChecked(accountRelated ? false : true);
            document.body.style.overflow = !accountRelated ? 'hidden' : 'auto';
        } else {
            setIsChecked(checked);
            document.body.style.overflow = 'auto';
        }
        
    }

    const handleChange = (event) => {
        updateCheckedStatus(event.target.checked);
      };

    return (<div className='nav-links'>
    <input type="checkbox" name="menu-expand" id="menu-expand" ref={inputRef} checked={isChecked} onChange={handleChange} />
    <label htmlFor='menu-expand' ><img width='22px' src={isChecked ? xMark : bar} alt="Expand menu bar button" /></label>
    <div className="menu-background" onClick={() => updateCheckedStatus(false)}></div>
    <div className="menu">
        <div className="tag-pages">
            <NavLink onClick={() => updateCheckedStatus(false)} to="/tags/film">Film</NavLink>
            <p>{'/'}</p>
            <NavLink onClick={() => updateCheckedStatus(false)} to="/tags/tech">Tech</NavLink>
            <p>{'/'}</p>
            <NavLink onClick={() => updateCheckedStatus(false)} to="/tags/fashion">Fashion</NavLink>
            <p>{'/'}</p>
            <NavLink onClick={() => updateCheckedStatus(false)} to="/tags/other">Other</NavLink>
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