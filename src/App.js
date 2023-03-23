import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { KanbanBoard } from './Components/KanbanBoard';
import LoginPage from './Components/LoginPage';
import RestaurantProvider from './Context/Context';
import RoutesList from './Routes/RoutersLists';


function App() {
  return (
    <RestaurantProvider>
      <BrowserRouter>
        <RoutesList />
      </BrowserRouter>
    </RestaurantProvider>
  );
}

export default App;
