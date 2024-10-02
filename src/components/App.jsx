import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar'
import '../styles/App.css'

function App() {
  const [justLoggedIn, setJustLoggedIn] = useState({value: false});
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <nav>
      <p onClick={() => {navigate('/'); setIsChecked(false)}} >My Blog</p>
      <NavBar justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn} isChecked={isChecked} setIsChecked={setIsChecked}/>
      <hr />
    </nav>
    <main>
      <Outlet /> 
    </main>
    <footer>Copyright © <span id="date"></span> SofoniasElala  <a href="https://github.com/sofoniasElala/my-blog-main"><i className="fa-brands fa-github" style={{color: "#000000"}}></i></a></footer>
    </>
  )
}

export default App
