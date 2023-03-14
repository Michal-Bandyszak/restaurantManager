import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { ShiftProvider } from './Components/ShiftProvider';
import { KanbanBoard } from './Components/KanbanBoard';
// import { Workers } from './Components/Workers';
import { addShift } from '../API/Api';

function App() {
  // addShift(952452883, '8:00', '16:00', true, 1)
  return (
  
    <ShiftProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<KanbanBoard />} /> */}
           
          {/* <Route path="/workers" element={<Workers />} /> */}
          {/* <Route path="/add-shift" component={AddShift} /> */}
        </Routes>
      </BrowserRouter>
    </ShiftProvider>
  );
}

export default App;
