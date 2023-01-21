import React, { useState, useEffect } from 'react';
import { ShiftContext } from './ShiftContext';
import { KanbanBoard } from './KanbanBoard';

export function ShiftProvider({ children }) {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8088/shift/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json()
      })
      .then((data) => {
        setShifts(data);
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
