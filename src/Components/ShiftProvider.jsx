import React, { useState, useEffect } from 'react';
import { ShiftContext } from './ShiftContext';
import { KanbanBoard } from './KanbanBoard';
import { getAllShifts } from '../API/Api';

export function ShiftProvider({ children }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllShifts()
      .then((shifts) => {
        setShifts(shifts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <ShiftContext.Provider value={{ shifts, loading }}>
      {loading ? <p>Loading...</p> : <KanbanBoard shifts={shifts} />}
    </ShiftContext.Provider>
  );
}
