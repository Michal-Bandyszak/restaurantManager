import { createContext, useReducer } from 'react';
import { restaurantReducer, initialRestaurantState } from '../Reducers/';

export const TodoContextComponent = createContext({});

function TodoContext({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialRestaurantState);

  return (
    <TodoContextComponent.Provider value={[state, dispatch]}>
      {children}
    </TodoContextComponent.Provider>
  );
}

export default TodoContext;