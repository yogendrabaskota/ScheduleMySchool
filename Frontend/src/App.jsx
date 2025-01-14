
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './global/components/Navbar'
import Home from './pages/home/Home'
import EventDetails from './pages/eventDetails/EventDetails'




function App() {
 

  return (
    <>
  
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:id" element={<EventDetails />} />

    </Routes>
      
    
    
    </BrowserRouter>
    
    </>


      
    
  )
}

export default App