import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './WorkerCard.scss';

export default function WorkerCard({ shift }) {
  return (
    <div
      key={shift.id}
      className={`shift-card ${shift.available ? '' : 'not-available'}`}
    >
      <p className="worker-name">
        Worker:
        {shift.worker
          ? ` ${shift.worker.name} ${shift.worker.surname}`
          : ' Not Available'}
      </p>
      <div className="time-start">
        <p>Start hour: {shift.startHour}</p>
        <p>Availability: {shift.available ? 'Yes' : 'No'}</p>
      </div>
      <p>End hour: {shift.endHour}</p>
    </div>
  );
}
