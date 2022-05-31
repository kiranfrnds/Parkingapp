
import { Route, Routes, useRoutes } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import ExitFromParking from './components/ExitFromParking/ExitFromParking';
import ParkingLot from './components/ParkingLot/ParkingLot';
import  {ParkingContextProvider}  from './ParkingContext';

function App() {
  return (
    <ParkingContextProvider>
      <Routes> 
        <Route path="/" element={<Admin />} />
        <Route path="slots" element={<ParkingLot />} />   
        <Route path = 'exit' element = { <ExitFromParking /> } />
    </Routes>
    </ParkingContextProvider>
  );
}

export default App;
