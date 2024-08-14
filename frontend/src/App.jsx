import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Votercard from './pages/Votercard.jsx'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    <Votercard/>
    </>
  )
}

export default App