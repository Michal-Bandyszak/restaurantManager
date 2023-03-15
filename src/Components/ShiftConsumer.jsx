import React, { useContext } from 'react';
import { Context } from '../Context/Context.jsx';

export function ShiftConsumer({ children }) {
  const { shifts, loading } = useContext(ShiftContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children(shifts);
}
