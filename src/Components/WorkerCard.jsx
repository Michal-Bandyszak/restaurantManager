import React from 'react';

export function WorkerCard({ worker }) {
  return (
    <div className="worker-card">
      <p>Name: {worker.name}</p>
      <p>Surname: {worker.surname}</p>
    </div>
  );
}