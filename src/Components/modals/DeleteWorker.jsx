import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import { RestaurantContext } from '../../Context/Context';
import { deleteWorker } from '../../API/api';
import {
  toggleDeleteModal,
  deleteWorker as deleteWorkerAction,
} from '../../Reducers/restaurantReducer';

export default function DeleteWorkerModal() {
  const [{ workers }, dispatch] = useContext(RestaurantContext);
  const worker = workers[0];

  const handleDelete = async () => {
    try {
      await deleteWorker(worker.id);
      dispatch(deleteWorkerAction(worker.id));
      dispatch(toggleDeleteModal());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="div" sx={{ p: '0 20px 20px' }}>
      <p>Are you sure you want to delete this worker?</p>
      <div style={{ fontStyle: 'italic', margin: '20px 0 30px' }}>
        <p>
          <span style={{ fontWeight: 'bold ' }}>Worker:</span>
          {worker ? ` ${worker.name} ${worker.surname}` : ' Not Available'}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>ID:</span>
          {' ' + worker.id}
        </p>
        <p>
          <span style={{ fontWeight: 'bold ' }}>Username:</span>
          {worker.username ? ' Yes' : ' No'}
        </p>
      </div>
      <Button fullWidth onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
}
