import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import { RestaurantContext } from '../../Context/Context';
import { deleteShift } from '../../API/api';
import {
  toggleDeleteModal,
  deleteWorkerShift,
} from '../../Reducers/restaurantReducer';

export default function DeleteShiftModal() {
  const [{ shift }, dispatch] = useContext(RestaurantContext);

  const handleDelete = async () => {
    try {
      await deleteShift(shift.id);
      dispatch(deleteWorkerShift(shift.id));
      dispatch(toggleDeleteModal());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="div" sx={{ p: '0 20px 20px' }}>
      <p>Are you sure you want to delete this shift?</p>
      <div style={{ fontStyle: 'italic', margin: '20px 0 30px' }}>
        <p>
          <span style={{ fontWeight: 'bold ' }}>Worker:</span>
          {shift.worker
            ? ` ${shift.worker.name} ${shift.worker.surname}`
            : ' Not Available'}
        </p>
        <p>
          <span style={{ fontWeight: 'bold ' }}>Time:</span>
          {' ' + shift.startHour} - {shift.endHour}
        </p>
        <p>
          <span style={{ fontWeight: 'bold ' }}>Availability:</span>
          {shift.available ? ' Yes' : ' No'}
        </p>
      </div>
      <Button fullWidth onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
}
