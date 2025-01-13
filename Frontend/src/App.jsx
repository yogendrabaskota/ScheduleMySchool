
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './global/components/Navbar'




function App() {
 

  return (
    <>
  
    <BrowserRouter>
    <Navbar />
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}

    </Routes>
      
    
    
    </BrowserRouter>
    
    </>


      
    
  )
}

export default App