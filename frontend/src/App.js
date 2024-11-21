import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Attack from './Pages/Attack'
import Cars from './Pages/Cars';
import CarDetails from './Pages/CarDetails'
import RE from './Pages/RE';
import NavBar from './Components/NavBar'
import LogDetails from './Pages/LogDetails';
import NotFound from './Pages/NotFound';
import CarCreate from './Pages/CarCreate';
import LogCreate from './Pages/LogCreate';



function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes className="container mx-auto">
          <Route path="/" element={<Home />}/>
          <Route path="/cars" element={<Cars />}/>
          <Route path="/cars/:carid" element={<CarDetails />}/>
          <Route path="/cars/create" element={<CarCreate />}/>
          <Route path="/cars/:carid/:logid" element={<LogDetails />}/>
          <Route path="/logs/:carid/create" element={<LogCreate />}/>
          <Route path="/attack" element={<Attack />}/>
          <Route path="/re" element={<RE />}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
