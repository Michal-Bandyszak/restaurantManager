import { createContext, useReducer } from 'react';
import { restaurantReducer, initialRestaurantState } from '../Reducers/';

export const RestaurantContextComponent = createContext({});

function RestaurantContext({ children }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialRestaurantState);

  return (
    <RestaurantContextComponent.Provider value={[state, dispatch]}>
      {children}
    </RestaurantContextComponent.Provider>
  );
}

export default RestaurantContext;