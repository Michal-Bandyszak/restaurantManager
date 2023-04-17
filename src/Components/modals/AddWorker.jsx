import { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import { useForm } from 'react-hook-form';

import { addWorker, updateWorker } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import { addNewWorker, updateWorker as updateWorkerAction } from '../../Reducers/restaurantReducer';

export default function AddNewWorkerModal({ handleClose, isEditModal }) {
  const [{ selectedWorker: worker }, dispatch] = useContext(RestaurantContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: isEditModal ? worker.name : null,
      surname: isEditModal ? worker.surname : null,
      username: isEditModal ? worker.username : null,
      workerLevel: isEditModal ? worker.workerLevel : null,
    },
  });

  async function onSubmit(formData) {
    if (isEditModal) {
      const workerData = {
        ...formData,
        workerId: parseInt(worker.id),
      };

      const data = await updateWorker(workerData);
      dispatch(updateWorkerAction(data));
    } else {
      const workerData = {
        ...formData,
      };
      const data = await addWorker(workerData);
      dispatch(addNewWorker(data));
    }
    handleClose();
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      sx={{
        p: '0 20px 20px',
        maxWidth: '350px',
        textAlign: 'center',
      }}
    >
      <TextField
        required
        label="Name"
        {...register('name')}
        fullWidth
        placeholder="Enter name"
        type="textfield"
        sx={{
          mb: 2,
        }}
      />
      <TextField
        required
        label="Surname"
        placeholder="Enter surname"
        {...register('surname')}
        fullWidth
        sx={{
          mb: 2,
        }}
      />
      <TextField
        required
        name="username"
        label="Username"
        placeholder="Enter username"
        {...register('username')}
        fullWidth
        sx={{
          mb: 2,
        }}
      />
      <TextField
        required
        label="Worker Level"
        placeholder="Enter worker level"
        type="text"
        {...register('workerLevel')}
        fullWidth
        sx={{
          mb: 2,
        }}
      />

      <Button type="submit" variant="solid">
        {isEditModal ? 'Edit' : 'Add'} worker
      </Button>
    </Box>
  );
}
