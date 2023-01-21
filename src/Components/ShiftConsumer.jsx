import React, { useContext } from 'react';
import { ShiftContext } from './ShiftContext';

export function ShiftConsumer({ children }) {
  const { shifts, loading } = useContext(ShiftContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children(shifts);
}
