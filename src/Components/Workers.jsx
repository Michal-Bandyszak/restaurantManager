import React, { useState, useEffect } from 'react';
import { WorkerCard } from './WorkerCard';
import { WorkerContext } from './WorkerContext';

export function Workers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8088/workers/all')
      .then((res) => res.json())
      .then((data) => setWorkers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <WorkerContext.Provider value={{ workers }}>
      <div>
        <h2>Workers</h2>
        <div className="worker-container">
          {workers.map((worker) => (
            <WorkerCard worker={worker} key={worker.id} />
          ))}
        </div>
      </div>
    </WorkerContext.Provider>
  );
}
