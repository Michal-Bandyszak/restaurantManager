import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
