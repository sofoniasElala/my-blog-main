import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <h1>My Blog</h1>
      <hr />
    </nav>
    <main>
      <Outlet />
    </main>
    <footer>Copyright © <span id="date"></span> SofoniasElala  <a href="https://github.com/sofoniasElala/blog-content-management-system"><i className="fa-brands fa-github" style={{color: "#000000"}}></i></a></footer>
    </>
  )
}

export default App
