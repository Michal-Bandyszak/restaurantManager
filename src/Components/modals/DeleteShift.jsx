import React, { useContext } from 'react';
import { RestaurantContext } from '../../Context/Context';
import { deleteWorkerShift } from '../../API/api';

export default function DeleteShiftModal({ shift, onClose }) {
  const [, dispatch] = useContext(RestaurantContext);

  const handleDelete = async () => {
    try {
      await deleteWorkerShift(shift);
      dispatch({ type: 'DELETE_SHIFT', payload: shift });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete Shift</h2>
      <p>Are you sure you want to delete this shift?</p>
      <p>
        {shift.worker
          ? `Worker: ${shift.worker.name} ${shift.worker.surname}`
          : 'Worker: Not Available'}
      </p>
      <p>
        Time: {shift.startHour} - {shift.endHour}
      </p>
      <p>Availability: {shift.available ? 'Yes' : 'No'}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
