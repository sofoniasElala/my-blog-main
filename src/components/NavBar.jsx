import { NavLink } from 'react-router-dom';


export default function NavBar() {
    return (<div className='nav-links'>
    <button onClick={ () =>  console.log('nume')} >{localStorage.getItem('blog-user') ? 'Log out' : 'Log in'}</button>
    </div>)
}