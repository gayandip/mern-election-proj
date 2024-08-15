import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App