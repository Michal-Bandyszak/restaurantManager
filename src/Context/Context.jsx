import { createContext, useReducer } from 'react';
import { workerReducer, initialRestaurantState } from '../Reducers/restaurantReducer';

export const RestaurantContext = createContext({});

function RestaurantProvider({ children }) {
  const [state, dispatch] = useReducer(workerReducer, initialRestaurantState);

  return (
    <RestaurantContext.Provider value={[state, dispatch]}>
      {children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantProvider;