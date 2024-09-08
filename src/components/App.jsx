import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'
import '../styles/App.css'

function App() {
  const [justLoggedIn, setJustLoggedIn] = useState({value: false});
  return (
    <>
    <nav>
      <p>My Blog</p>
      <NavBar justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn}/>
      <hr />
    </nav>
    <main>
      <Outlet context={[justLoggedIn, setJustLoggedIn]}/>
    </main>
    <footer>Copyright © <span id="date"></span> SofoniasElala  <a href="https://github.com/sofoniasElala/my-blog-main"><i className="fa-brands fa-github" style={{color: "#000000"}}></i></a></footer>
    </>
  )
}

export default App
